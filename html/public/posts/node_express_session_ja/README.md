# express-session

## インストール

[npm registry](https://www.npmjs.com/)を通して利用可能な[Node.js](https://nodejs.org/en/)モジュールです。

インストールは[`npm install`コマンド](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)で出来ます。

```
$ npm install express-session
```

## API

```
var session = require('express-session')
```

### session(options)

与えられたoptionsに従ってセッションMiddlewareを作成します。

**Note:**セッションデータはクッキーには保存されません、クッキーに保存されるのはセッションIDです。セッションデータ自体はサーバーサイドで保存されます。

**Note:**バージョン1.5.0以降、このモジュールに[cookie-parserミドルウェア](https://www.npmjs.com/package/cookie-parser)は不要になりました。このモジュールは今では`req/res`を用いて直接クッキーを読み書きしています。`cookie-parser`を使用すると、もしsecretがこのモジュールと`cookie-parser`間で統一されていない場合不具合の原因になってしまいます。

**Warning:**デフォルトのサーバーサイドのセッションストレージである`MemoryStore`は、わざと本番環境のために設計していません。`MemoryStore`は多くの状況でメモリリークを引き起こし、does not scale past a single process,つまり`MemoryStore`は開発やデバッグ用途のものなのです。

セッションの保存方式一覧は、[Compatible Session Stores](https://www.npmjs.com/package/express-session#compatible-session-stores)を確認してください。

#### Options

`express-session`はoptionsオブジェクトに以下のプロパティを利用できます。

##### cookie

セッションIDを保存するクッキーのための設定です。

デフォルトは以下の通りです。

```
{
  path: '/',
  httpOnly: true,
  secure: false,
  maxAge: null
}
```

以下のオプションはこのオブジェクトに設定できるものです。

###### cookie.domain

Specifies the value for the Domain Set-Cookie attribute. By default, no domain is set, and most clients will consider the cookie to apply to only the current domain.

###### cookie.expires

`Expires Set-Cookie`に設定する値をDateオブジェクトで定義。デフォルトでは期限は設定されず、ほとんどのクライアントでは"non-persistent cookie"としてみなされ、ブラウザを終了した段階で削除されます。

**Note:**`expires`と`maxAge`の両方が設定された場合、最後に設定された物が使用されます。

**Note:**`expires`オプションは直接設定せず、`maxAge`オプションのみを代わりに使用するべきである。


###### cookie.httpOnly

`HttpOnly Set-Cookie`に設定するboolean値。

 When truthy, the HttpOnly attribute is set, otherwise it is not. By default, the HttpOnly attribute is set.

**Note:**be careful when setting this to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.
