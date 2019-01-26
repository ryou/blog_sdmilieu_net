# [Firebase] メモ

## SPAを作る際のリダイレクトルールの設定

`firebase.json`に設定する。

```
{
  "hosting": {

    ~

    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

設定内容はみたまんま。

[デプロイ構成  |  Firebase](https://firebase.google.com/docs/hosting/full-config?hl=ja)
