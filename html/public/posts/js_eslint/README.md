# ESLint覚書

今まではJSHintを使用していたが、webpack+Vue.jsで個人的に物を作るにあたってES2015以降の構文を使用したい状況が多く出てきたため、ESLintに移行することにした。

その備忘録。

[ESLint - Pluggable JavaScript linter](https://eslint.org/)

## 全体の流れ

+ エディタの準備
  + linter-eslintのインストール
+ プロジェクトの準備
  + ローカルにeslintをインストール
  + 設定ファイルを配置

## エディタの準備

### linter-eslintのインストール

Atomの場合は、linter-eslintをインストールする。

依存しているパッケージが複数あるが、linter-eslintをインストールする際に「これも必要だけどインストールする？」って確認してくれるので、そこで一緒にインストールすればいい。


## プロジェクトの準備

プロジェクト毎にES2015の仕様を利用していけるのか、それとも利用できないのか等、構文チェックの要件は異なってくる。

そのため、ESLintをプロジェクト毎に準備することで、プロジェクト毎に設定を変更できるようにしておく。

### ローカルにESLintをインストール

```
npm init
npm i -D eslint
```

### 設定ファイルを配置

設定ファイルは自分で作成する事も可能だが、項目が多いためとりあえず最初はメジャーであるAirbnbの設定ファイルを利用することとする。

[Javascript-style-guide](https://mitsuruog.github.io/javascript-style-guide/)


```
# eslintのinitコマンド
./node_modules/.bin/eslint --init

# 「人気のスタイルガイドを使用する」を選択しEnter
? How would you like to configure ESLint?
  Answer questions about your style
❯ Use a popular style guide
  Inspect your JavaScript file(s)

# 「Airbnb」を選択しEnter
? Which style guide do you want to follow?
  Google
❯ Airbnb
  Standard
```

## ESLintメモ

### 例外の行

以下の行はエラーとなる可能性がある。

```
new Vue({ // この行
  ~
});
```

[no-new - Rules - ESLint - Pluggable JavaScript linter](https://eslint.org/docs/rules/no-new)

要約すると「newした結果を変数に保存しないなら、そもそもそのクラスがコンストラクタでやっている処理は関数でやるべきだよね？」って感じ。

ただ今回のような場合は外部ライブラリを使用しており、流石にそれを弄るのは面倒。かといってエラーを放置するのも気持ち悪い。

以下のように書けば例外としてESLintはエラーをスルーする。

```
new Vue({ // eslint-disable-line no-new
  ~
});
```

`no-new`の部分は該当するチェック項目。ここを記述せず`eslint-disable-line`のみでもエラーは回避出来るが、その場合はあらゆるチェック項目をスルーしてしまう。

エラーとして表出されるべき項目もスルーされてしまう可能性があるので、出来ればピンポイントで問題となっている項目だけ指定すること。
