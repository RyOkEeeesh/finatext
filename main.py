import os
import glob
from ollama import Client

# --- 設定 ---
TARGET_DIR = "./tests"
FILE_PATTERN = "*.md"
OUTPUT_FILE = "summary_report.md"
MODEL_NAME = "gemma4:12b"
# -----------

client = Client()

def read_files(directory, pattern):
    path = os.path.join(directory, pattern)
    files = glob.glob(path)
    return files

def generate_summary(text, prompt_template):
    prompt = prompt_template.format(text=text)
    response = client.generate(
        model=MODEL_NAME,
        prompt=prompt,
        options={
            "temperature": 0.3,
        }
    )
    return response['response']

def main():
    files = read_files(TARGET_DIR, FILE_PATTERN)
    if not files:
        print(f"Error: No files matching '{FILE_PATTERN}' found in '{TARGET_DIR}'")
        return

    print(f"Found {len(files)} files. Starting individual summary...")

    # 各ファイルの個別要約用プロンプト
    individual_prompt = (
        "以下のテスト結果ログを読み込み、主要なエラー、失敗したテストケース、"
        "および全体の成否（Pass/Failの数など）を簡潔に箇条書きで抽出してください。\n\n"
        "--- テスト結果 ---\n{text}"
    )

    individual_summaries = []
    for i, file_path in enumerate(files, 1):
        print(f"[{i}/{len(files)}] Processing {os.path.basename(file_path)}...")
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
            # ファイルが空でなければ要約を実行
            if content.strip():
                summary = generate_summary(content, individual_prompt)
                individual_summaries.append(f"### File: {os.path.basename(file_path)}\n{summary}\n")
            else:
                print(f"Skipped empty file: {file_path}")
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    print("\nAll files individual summaries done. Generating final overview report...")

    # 最終的な統合要約用プロンプト
    final_prompt = (
        "あなたは優秀なシニアエンジニアです。以下に集められた複数のテスト結果の要約をすべて読み込み、"
        "全体としての『要点（サマリー）』を Markdown 形式でまとめてください。\n\n"
        "必ず以下の項目を含めて整理してください：\n"
        "1. 総合結果の概要（全体で何件中何件成功/失敗したか、重大なエラーの有無）\n"
        "2. 共通するボトルネックや、頻出している具体的なエラー原因の傾向\n"
        "3. 優先的に修正・対応すべきコンポーネントや項目へのアドバイス\n\n"
        "--- 各テストの要約データ ---\n{text}"
    )

    combined_text = "\n".join(individual_summaries)
    
    # 最終レポートの生成
    final_report = generate_summary(combined_text, final_prompt)

    # 結果を保存
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("# 総合テスト結果要約レポート\n\n")
        f.write(final_report)

    print(f"\nSuccess! Final report saved to '{OUTPUT_FILE}'")

if __name__ == "__main__":
    main()