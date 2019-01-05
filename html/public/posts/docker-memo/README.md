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
