# Laravelメモ

## whereでOR検索したい

同一カラムなら`whereIn`を使う。

```
$users = DB::table('users')
                    ->whereIn('id', [1, 2, 3])
                    ->get();
```

[データベース：クエリビルダ 5.6 Laravel（※「Where節を参照」）](https://readouble.com/laravel/5.6/ja/queries.html)


## Laravelで常に特定のレスポンスヘッダーを設定したい

[ミドルウェア 5.6 Laravel](https://readouble.com/laravel/5.6/ja/middleware.html)

ミドルウェアで指定すればいい。

例えば、CORSに対応するために`Access-Control-Allow`系のヘッダーを指定する場合以下のようになる。

```
public function handle($request, Closure $next)
{
    return $next($request)
            ->header("Access-Control-Allow-Origin", config("app.allow-origin"))
            ->header("Access-Control-Allow-Credentials", "true")
            ->header("Access-Control-Allow-Methods", "POST, GET")
            ->header("Access-Control-Allow-Headers", "Content-Type");
}
```



## Laravelはクッキーが暗号化されている

デフォルトで、ミドルウェアの`EncryptCookies`でクッキーが暗号化されている。

なので、DevToolsで表示されているクッキー情報（暗号化されている）と、Laravel内のクッキー情報（復号後）は異なっているので注意。



## 最初にtimezone設定をしておく

デフォルトではUTCのため、DBに保存するTimeStamp等もUTCとして保存されてしまう。

JSTとして保存したい場合はtimezone設定をしておくこと。

[LaravelのtimezoneをデフォルトのUTCからJST(日本標準時)へ変更する](https://qiita.com/pinkumohikan/items/2e9cefb85d75a8622d99)



## oldヘルパーのデフォルト値

Laravelで、バリデーション後フォームの入力値にバリデーション前と同じ値を入力させておきたい場合、`old`ヘルパーを使用するが、oldにはデフォルト値を設定できる

```
old("title", $post->title)
```

## 入れ子形式のリクエスト

```
  "post" => array:2 [▼
    "title" => "heah"
    "content" => "ahe"
  ]
```

こんな形のリクエストが欲しい場合、

```
<div><input type="text" name="post[title]" value="{{ $values["title"] }}"></div>
<div><textarea name="post[content]">{{ $values["content"] }}</textarea></div>
```

こう。



## 多次元配列のバリデーション

```
<form method="post" action="{{ $actionUrl }}">
    @csrf
    <div><input type="text" name="post[title]" value="{{ $values["title"] }}"></div>
    <ul>
        <li><input type="text" name="tags[0][name]"></li>
        <li><input type="text" name="tags[1][name]"></li>
    </ul>
    <div><textarea name="post[content]">{{ $values["content"] }}</textarea></div>
    <div><button type="submit">submit</button></div>

    <input name="_method" type="hidden" value="{{ $method }}">
</form>
```

これのバリデーションは

```
public function rules()
{
    return [
        "post.title" => "required",
        "post.content" => "required",
        "tags.*.name" => "required",
    ];
}
```

こう



## バリデーションでmin/maxが働かない

min/maxによるバリデーションをしたい場合、以下のようにinteger等も指定して数値として認識させる必要がある。

```
public function rules()
{
    return [
        "num" => "required|integer|min:3",
    ];
}
```


## .htaccessを使用せず常時SSL化対応

Middlewareで対応

[Laravel5で.htaccessを使用せず常時SSL化対応する方法](https://qiita.com/qwe001/items/7cd0bcb149b5b5cc0fd7)