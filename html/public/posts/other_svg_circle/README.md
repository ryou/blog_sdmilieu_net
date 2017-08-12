# SVGで進捗を表示する円をアニメーションさせる

円形の進捗を表示するデザインはd3.jsにデフォルトで用意されているが、それだけの為にd3.jsを利用するのはオーバーな感じがする。

SVGに関して無知だったので調べてみたら、d3.jsをわざわざ使わなくても結構簡単に実装出来たのでまとめておく。

## pathのd属性を弄る

[DEMO](./examples/example01.html)


## stroke-dasharray/stroke-dashoffsetを利用する

SVGでは、pathを点線として表現することが可能。

`stroke-dasharray`で各点線の長さ、`stroke-dashoffset`で点線の開始位置を設定することが出来る。

点線本来の用途ではないが、この２つを利用して線をアニメーションさせることが可能。

[DEMO](./examples/example02.html)

pathの内容が動的に変化する場合はこの手法は取れないが、pathの内容が固定の場合この手法でアニメーションさせるのが手軽。

## 参考

[SVGによる円弧の描画サンプル](http://yamatyuu.net/computer/html/svg/arc.html)
