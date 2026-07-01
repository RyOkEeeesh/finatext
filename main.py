import os
import glob
import re
from ollama import Client

# --- 設定 ---
TARGET_DIR = "./tests"  # ベンチマークのmdファイルが入っているフォルダ
FILE_PATTERN = "*.md"          # 対象ファイル
OUTPUT_FILE = "report.md"
MODEL_NAME = "gemma4:12b"
# -----------

# 共通コンテキスト：実装の仕様や実験環境
APP_SPEC_CONTEXT = """
【実験環境】
- ネットワーク帯域: 1Gbps環境
- 負荷テストツール: k6

【対象アプリケーションの共通仕様（Goの実装例をベースにした仕様）】
1. エンドポイント `/` : トップページのHTML返却
2. エンドポイント `/address` : 
   - 郵便番号をバリデーションし、外部API (https://geoapi.heartrails.com/api/json) から住所を取得
   - 東京駅からの距離を計算して返却
   - アクセスログをメモリ上のバッファ (`logBuffer`) に記録
3. エンドポイント `/address/access_logs` :
   - 30秒に1回、メモリ上のログバッファをDB（PostgreSQL）にバルクインサートする
   - リクエスト時はまずインメモリキャッシュ（GoではBigCache）を確認。キャッシュがあれば即返却
   - キャッシュがない場合はDBから `GROUP BY` で集計して取得し、キャッシュに格納
   
【検証言語とフレームワーク】
- go: Go + Gin
- ts / bun: Bun + Hono
- rust: Rust + Axum

【テスト形式の仕様】
- 単一エンドポイントテスト (例: `address-access_logs` や `address` 単体): 特定のAPIに対してのみ負荷をかける。
- 混在負荷テスト (`mixed`): k6の複数シナリオを使用。
  - 全体VUsの80%を `/address` に割り当て（ただし各VUは処理後に sleep(1) を挟む）。
  - 全体VUsの20%を `/address/access_logs` に割り当て（sleepなしで連続リクエスト）。
  - 外部APIアクセスの裏で、ノンストップなDB集計（キャッシュあり）と30秒ごとのバルクインサートが同時に走るため、リソース競合やキャッシュの有効性が色濃く出る。
"""

client = Client()

def parse_filename(filename):
    """ファイル名（例: go_address-access_logs_10_30s.md / ts_address-mixed_1000_30s.md）からメタデータを抽出"""
    name_without_ext = os.path.splitext(filename)[0]
    # 言語 _ テスト形式/エンドポイント _ VUs _ 時間s のパターン
    match = re.match(r"^([^_]+)_(.+)_([0-9]+)_([0-9]+s)$", name_without_ext)
    if match:
        return {
            "lang": match.group(1),# 正確性を最優先
            "test_type": match.group(2).replace("-", "/"),
            "vus": match.group(3),
            "duration": match.group(4)
        }
    return {"lang": "Unknown", "test_type": "Unknown", "vus": "Unknown", "duration": "Unknown"}

def generate_summary(prompt):
    response = client.generate(
        model=MODEL_NAME,
        prompt=prompt,
        options={
            "temperature": 0.2, # 正確性を最優先
            "num_ctx": 16384
        }
    )
    return response['response']

def main():
    path = os.path.join(TARGET_DIR, FILE_PATTERN)
    files = glob.glob(path)
    if not files:
        print(f"Error: No files matching '{FILE_PATTERN}' in '{TARGET_DIR}'")
        return

    print(f"Found {len(files)} benchmark files. Starting analysis...")

    individual_summaries = []
    for i, file_path in enumerate(files, 1):
        filename = os.path.basename(file_path)
        meta = parse_filename(filename)
        
        print(f"[{i}/{len(files)}] Analyzing {filename}...")
        
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # 個別ファイル解析用のプロンプト
            individual_prompt = f"""
# 指示
あなたは優秀なパフォーマンスチューニングエンジニアです。
提示されたバックエンドのベンチマーク結果（Markdown）を分析し、結果の要点（成功率、平均/最遅レイテンシ、秒間スループット、パフォーマンストレンド）を3〜5行程度で超簡潔に箇条書きで抽出してください。

【実験・アプリケーション背景】
{APP_SPEC_CONTEXT}

【このファイルの実験条件】
- 実行言語/ランタイム: {meta['lang']}
- テスト形式 / 対象: {meta['test_type']}
- 同時接続数 (VUs): {meta['vus']}
- 実行時間: {meta['duration']}

--- ベンチマークデータ ({filename}) ---
{content}
"""
            if content.strip():
                summary = generate_summary(individual_prompt)
                individual_summaries.append(
                    f"### 【{meta['lang'].upper()}】 {meta['test_type']} (VUs: {meta['vus']}, Duration: {meta['duration']})\n"
                    f"- **ファイル名**: {filename}\n"
                    f"{summary}\n"
                )
        except Exception as e:
            print(f"Error processing {filename}: {e}")

    print("\nAll files analyzed. Generating final comparative report...")

    # 全データを統合してクロス分析させるプロンプト
    final_prompt = f"""
あなたは最高峰のバックエンドシステムアーキテクトです。
集計された各言語・テスト形式のベンチマーク要約を比較分析し、技術的な洞察に満ちた『総括レポート』を日本語の Markdown 形式で作成してください。

【基本情報・アプリケーション仕様・テスト形式】
{APP_SPEC_CONTEXT}

【各ベンチマークの個別データサマリー】
{"\n".join(individual_summaries)}

---
【出力レポートの構成案】
1. ## 総合サマリー
   - 1Gbps環境において、全体としてどの言語・フレームワークが最も高いパフォーマンス・安定性を示したか
2. ## 単一負荷 vs 混在負荷（mixed）の比較考察
   - 単一のテストと、`mixed`（80% address + sleep / 20% logs + sleepなし）の混在テストで、数値にどのような変化が起きたか。
   - 特に `mixed` テストにおける、30秒ごとのバルクインサート（flushLogsToDB）やインメモリキャッシュの破壊・再構築が各言語（Go, Bun, Rust）のレイテンシやスループットにどう影響しているか
3. ## 言語・ランタイム別の詳細評価
   - Go + Gin, Bun(ts) + Hono, Rust + Axum のアーキテクチャ特性（非同期処理、メモリ管理、インメモリキャッシュの実装アプローチなど）を踏まえた強みと弱みの分析
4. ## 次のステップへのボトルネック解消・チューニング提言
"""

    final_report = generate_summary(final_prompt)

    print("\n--- [DEBUG] final_report の中身 ---")
    print(final_report)
    print("------------------------------------\n")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("# バックエンド3言語合同 負荷テスト・ベンチマーク総合分析レポート\n\n")
        f.write(final_report)

    print(f"\nSuccess! Deep analysis report saved to '{OUTPUT_FILE}'")

if __name__ == "__main__":
    main()