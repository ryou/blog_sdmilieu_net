# [node.js]細かいことメモ

## ローカルにインストールしたパッケージをターミナルから実行したい

`./node_modules/.bin`内に実行ファイルがあるので

```
./node_modules/.bin/[パッケージ名]
```

で実行可能。

browserifyなら

```
./node_modules/.bin/browserify -h
```

で実行できることを確認出来る。

## 「npm run」の&と&&の違い

[Grunt/Gulpで憔悴したおっさんの話 - MOL](https://t32k.me/mol/log/npm-run-script/)

&&は直列、&は並列


## 「npm install --save」と「npm install --save-dev」の違い

### 結論

`--save`は`package.json`の`dependancies`、`--save-dev`は`devDependancies`に追加される。

### 詳細

`devDependancies`は名前の通り開発時に必要なパッケージ群なので、npmに公開したりする時に動作自体に必要なパッケージを`--save-dev`してしまうと動かない。あとHerokuでも動作に必要なパッケージを`--save-dev`してしまっていると動かなかった。

判断に迷ったらとりあえず`--save`しとけば良いと思った。

### 省略系

`--save`は`-S`、`--save-dev`は`-D`と書ける。

```
npm install --save
npm i -S

npm install --save-dev
npm i -D
```



## package-lock.jsonの意味

細かいバージョンを記録して、バージョンの違いによる挙動差異をなくす

[webのプロジェクトフォルダ直下のファイルの意味をまとめてみた - Qiita](http://qiita.com/tonkotsuboy_com/items/99b665cecf16f5ac037d)
