# BackstopJSの使い方

[BackstopJS](https://github.com/garris/BackstopJS)

## 準備

### ローカルにインストール

```
npm i -D backstopjs
```

### 設定ファイルを生成

```
npx backstop init
```

## 設定ファイルの書き方

設定項目は色々あるが、基本`scenarios`と`viewports`だけ弄れば使える。

### scenarios

```
{
  ~
  "scenarios": [
    {
      "label": "Top Page",
      "url": "http://localhost:8000/index.html",
      "delay": 1000
    }
  ],
  ~
}
```

`label`は生成するスクリーンショット等で使われるラベル。当然半角英数推奨。

他は名前のまま。

### viewports

見たらわかるけど、ブラウザサイズを指定する。

```
{
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  ~
}
```


## 使い方

### 比較元となる画像ファイルの生成

```
npx backstop reference
```

### 比較元画像と現状との比較処理

```
npx backstop test
```

### 比較元画像を現状で更新

```
npx backstop approve
```
