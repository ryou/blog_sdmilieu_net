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
