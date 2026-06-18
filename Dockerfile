# 1. ビルド用ステージ
FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# 2. 実行用ステージ
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main .
RUN apk --no-cache add ca-certificates tzdata

ENV TZ=Asia/Tokyo

EXPOSE 8080

CMD ["./main"]