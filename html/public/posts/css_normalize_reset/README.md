# [CSS]NormalizeかResetか

もはや今更な話だけど、ネット上のNormalize vs Resetの記事を見ててもNormalize肯定派しか見当たらず、その主張が個人的に納得いかないものだらけだったので自分の意見をまとめておく。

## Normalize/Resetの例

### Normalize: sanitize.css

[demo](./examples/sanitize.html)

### Reset: YUI3

[demo](./examples/yui3.html)

## 個人的な結論

ベースはResetを使う。デフォルトスタイルのmarginに0以外が指定されているのは有り得ない。

ただ、フォーム系等デフォルトの見た目が有用と判断されるものに関しては、リセットされていない物を使うor自身で弄ってリセットされないようにする。このあたりは個別調整。


## 詳細

### Normalizeのmargin問題

Normalizeで僕が特に嫌いなのはデフォルトスタイルでmarginを持ってしまっている点です。

例えば`sanitize.css`のh1要素だと、marginが以下のように指定されています。

```
margin: .67em 0;
```

このmarginの指定、滅茶苦茶邪魔じゃないですか？  
例えば「margin-bottomだけ20pxで他は0」みたいな「.heading01」を作る時、以下のようにしないといけません。

```
margin-top: 0; /* リセットスタイルを当てないといけない */
margin-bottom: 20px;
```

上記のように、多くのスタイルの指定で`sanitize.css`を使うとResetを使った場合本来不要なリセットスタイルを「個別に」当てないといけなくなると思うんですよ。個人的にはかなりありえない。


### デフォルトの指定を活かせる？ほんと？

「Normalizeを使っておくとデフォルトのスタイル指定活かせる」なんていう記事を頻繁に見かけますが、デフォルトスタイルのまま構築してOKなんて案件あります？少なくとも僕は見たことないです。


### 文書構造とスタイルの分離とは…

そもそも、HTML/CSSにおいて文書構造とスタイルの分離は大原則であって、Normalizeはその原則に逆行していると思うんですよ。「ここ今までh2だったけど、見た目はそのままでpにしよう」ってなった時にデフォルトのmargin活かしてたらCSSも調整いりますよね？見た目がHTMLに引きずられてるけどそれはいいんですかね？

確かにそうはいってもフォーム系などデフォルトの見た目が残って欲しい物はありますけど、marginまで残すのはちょっとやりすぎかなと思います。


### まとめ

以上のことから自分は圧倒的に（フォーム系等の見た目はデフォルトを残している）Reset派です。