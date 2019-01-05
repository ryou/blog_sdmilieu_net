# Dockerに関する覚書

## コマンド

### image系

```
# ローカルに存在するDockerイメージ一覧を表示
docker image ls

# Dockerfileを元にDockerイメージを作成
docker image build -t [イメージ名：タグ名] [対象Dockerfileのパス]
docker image build -t example/echo:latest .

# DockerレジストリからDockerイメージをローカルにダウンロード
docker image pull [オプション] [リポジトリ名：タグ名]
```

### container系

```
# ローカルに存在するDockerコンテナ一覧を表示
docker container ls

# Dockerイメージを元にコンテナを起動
docker container [オプション] [Dockerイメージ名:タグ名]
# -d: バックグラウンド実行
# -p ホスト側ポート：ゲスト側ポート
docker container run -d  -p 9000:8080 example/echo:latest

# コンテナ起動・終了系
docker container start [コンテナID] # 起動
docker container restart [コンテナID] # 再起動
docker container stop [コンテナID] # 終了
docker container kill [コンテナID] # 強制終了

# コンテナ削除
docker container rm [コンテナID]
```

### その他

```
# ヘルプ
docker help

# 破棄
docker container prune # 未使用コンテナの破棄
docker image prune # 未使用イメージの破棄
docker system prune # 未使用コンテナ・イメージの破棄
```

## 例

### 公式MySQLイメージを使ってコンテナを起動しSequelProで接続

```
# mysql8だとSequelProから接続出来ないので、mysql5.7を使用
docker image pull mysql:5.7

# ポートフォワードを忘れないように
docker container run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=[好きなパスワード] -d mysql:5.7

# コンテナを起動したら、SequelProに
# ホスト：127.0.0.1
# ユーザー名：root
# パスワード：入力したパスワード
# で接続出来る。
```

### 公式PHPイメージを使ってPHP開発環境を構築

公式の[Apache without a `Dockerfile`](https://hub.docker.com/_/php/)に書いてあるとおりやれば出来る。

```
docker container run -d -p 8080:80 --name my-apache-php-app -v "$PWD":/var/www/html php:7.2.13-apache
```

### ざっくりLAMP環境

#### `Dockerfile`

```
FROM php:7.2.13-apache
RUN apt-get update && \
  docker-php-ext-install pdo_mysql
```

`RUN`部分に関しては理解していないので、調べないといけない

#### `docker-compose.yml`

```
version: "3"
services:
  server:
    build: .
    ports:
      - 8080:80
    volumes:
      - ./public:/var/www/html
    links:
      - db
  db:
    image: mysql:5.7
    ports:
      - 3306:3306
    environment:
      - MYSQL_ROOT_PASSWORD=secret
```

`links`に`db`を指定することで、`db`でデータベースへの名前解決が出来るようになる。

#### `public/index.php`

```
<?php

$pdo = new PDO(
    'mysql:dbname=dockertest;host=db;charset=utf8mb4',
    'root',
    'secret',
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
);
```
