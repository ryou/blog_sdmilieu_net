# Chromeでページロード時に本来発動するはずのないtransitionが発動する

[Demo](./demo/index.html)

## 解説

リンク先ではこのような指定をしているだけです。

### HTML

```
<p class="sample">Bug Sample</p>
```

### CSS

```
.sample {
  opacity: 0;
  transition: all 5s;
}
```


これだけです。

本来ならページロード時、`.sample`完全に透明になって表示されないはずですが、「Chrome」かつ「リンク遷移」の時だけopacityが1から0になるようなtransitionが発動してしまいます。

[どうやら2014年時点で同様の不具合が報告](https://bugs.chromium.org/p/chromium/issues/detail?id=332189)されているみたいで、かなり根深い問題の模様。

対策としては、

```
html.-pageLoading * {
  transition: none !important;
}
```

のようなCSSを定義しておいて、`DOMContentLoaded`タイミングで`-pageLoading`クラスを外すといったような方法しかない感じ。
