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
