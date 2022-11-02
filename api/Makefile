###############################
# Matsunaga Project 2022 - Makefile
#
# 便利コマンド集
###############################
BIN_DIR:=bin

ROOT_PACKAGE:=$(shell go list .)

DB_PATH:="root:root@/dandes?parseTime=true"

###############################
# Go Generals
###############################

## Go moduleの依存関係を最新のものにする。定期的に実行しておくと良い。
update_module:
	go mod tidy

###############################
# Install Development tools
#
# goose -> DBのマイグレーションツール
# make2help -> MakefileのHelpを作成
###############################
## 開発用のパスを通す
setting_path:
	export PATH="$(PATH):$(PWD)/bin"

## 開発に必要なツール群のインストール
install_tools: $(BIN_DIR)/goose $(BIN_DIR)/make2help $(BIN_DIR)/swag $(BIN_DIR)/golangci-lint

$(BIN_DIR)/goose: go.sum
	@go build -o $@ github.com/pressly/goose/v3/cmd/goose

$(BIN_DIR)/make2help: go.sum
	@go build -o $@ github.com/Songmu/make2help/cmd/make2help

$(BIN_DIR)/swag: go.sum
	@go build -o $@ github.com/swaggo/swag/cmd/swag

$(BIN_DIR)/golangci-lint: go.sum
	@go build -o $@ github.com/golangci/golangci-lint/cmd/golangci-lint


###############################
# Make helps
#
###############################

## コマンド一覧の表示
help:
	$(BIN_DIR)/make2help $(MAKEFILE_LIST)
###############################
# DB Migrations
#
###############################

## 新たなマイグレーションファイルを作成。name=名前でマイグレーションの名前を指定する。
migrate_create:
	$(BIN_DIR)/goose -dir ./migrations create $(name) sql

## DBのマイグレーションを最新のバージョンにする。
migrate_up:
	$(BIN_DIR)/goose -dir ./migrations mysql $(DB_PATH) up

## DBのマイグレーションを1段階バージョンダウンする。
migrate_down:
	$(BIN_DIR)/goose -dir ./migrations mysql $(DB_PATH) down
###############################
# Docker containers
#
###############################

## UtaのDBを起動する。
db_local:
	docker compose up -d db

###############################
# Go tests
#
###############################
## internal以下のテストを実行する。
test:
	go test ./internal/...

###############################
# Go Lint
#
###############################
lint:
	$(BIN_DIR)/golangci-lint run internal/...

###############################
# Swagger
#
###############################
## OPENAPI仕様のドキュメントを生成する。
swag_gen:
	$(BIN_DIR)/swag init -generalInfo cmd/main.go -dir ./internal/ -output ./doc/api --parseInternal true

swag_fmt:
	$(BIN_DIR)/swag fmt -dir ./internal/controllers/handlers
