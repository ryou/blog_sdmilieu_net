# READ ME

## リポジトリclone後の準備事項


仮想マシンでの作業

```
// 仮想マシン起動
vagrant up

// 仮想マシンログイン
vagrant ssh

// composerでパッケージの取得
composer install

// 環境設定ファイルを作成
cp .env.example .env

// .envファイルにキーを生成
php artisan key:generate
```

ホスト端末での作業

```
// htmlディレクトリに移動
cd html

// npm関係のパッケージの取得
npm install
```
