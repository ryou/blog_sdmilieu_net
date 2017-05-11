# READ ME

## リポジトリclone後の準備事項


仮想マシンでの作業

```
// 仮想マシン起動
vagrant up

// 仮想マシンログイン
vagrant ssh

// articles.jsonの生成
cd html/public/_scripts
php generateArticleList.php
```

ホスト端末での作業

```
// htmlディレクトリに移動
cd html

// npm関係のパッケージの取得
npm install
```
