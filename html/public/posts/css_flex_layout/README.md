# [CSS]Flexboxに関してのメモ


## FlexboxじゃないとHTML/CSSのみで出来ないレイアウト

### 並べた要素を行毎に高さを揃える

[Demo](./examples/align_height.html)

上記のようなレイアウトは、Flexboxを使えない場合はJavaScriptを使わないと実現できない。

#### 前提知識

align-itemsにstretchを使えばフレックスアイテムの高さを行毎に揃えることが出来るが、レイアウトとモジュールで分けたい場合はそうもいかない。

その場合は以下のようにする。

[flexをつかって配置したモジュールの高さを、レイアウトの高さに揃える](./examples/stretch_height_auto_container.html)



### 画像+テキストレイアウト & テキスト縦方向中央揃え & 奇数（偶数）アイテム画像位置逆転 & レスポンシブ

[Demo](./examples/img_txt_responsive.html)

要はこんなレイアウト。結構よく見る。

要件としては以下のような物。

+ PCレイアウトは画像＋テキストの横並びレイアウト
+ PCレイアウトでは奇数番目のアイテムは画像とテキストの配置が逆
+ テキストは縦方向中央揃え
+ スマホレイアウトは縦に積むレイアウト

個々の要素だとFlexboxがなくてもいけるんだけど、全部そろうとtableレイアウト+JavaScriptじゃないと無理になる。


## Flexboxだと簡単に出来ること

### 横並びナビのリンクの高さを揃える / 横並びナビの一部を右端に寄せる

[Demo](./examples/nav_height_align.html)

`align-items: stretch`が便利な例。

あと`margin-x: auto`も便利。
