# [Vue.js] タブコンポーネント

[Demo](./demo/index.html)

コンポーネントの内部実装を意識しないで使える汎用的なタブコンポーネントを作りたかったが、Vue力が足りなくて無理だった。

使い方としては、

```
<tab-component :tabs="tabs">
  <template slot-scope="props">
    <div v-if="props.active === 0">
      <h1>Tab01</h1>
      <p>Tab01のコンテンツ</p>
    </div>
    <div v-if="props.active === 1">
      <h1>Tab02</h1>
      <p>Tab02のコンテンツ</p>
    </div>
  </template>
</tab-component>
```

のように、`tabs`プロパティにタブのタイトル配列を渡し、中にタブのコンテンツを記述していく。


`v-if="props.active === 0"`のように、スコープ付きスロットを利用してコンポーネントからアクティブなタブのindexを受け取っている。スコープ付きスロットは確かに有り難いのだけど、コンポーネントから値を取得する方法としては少し冗長であまり書いてて気持ちのいいものではない。

呼び出し元のコンポーネントで「どのタブがアクティブなのか」を持つ仕組みにすればタブコンポーネントは綺麗に記述出来るが、「どのタブがアクティブなのか」はタブコンポーネントが持っておくべき値と思うので今回の実装で妥協。
