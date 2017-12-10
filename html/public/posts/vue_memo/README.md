# [Vue.js]メモ

## 呼び出したコンポーネントにclickイベントで何かしたい場合は`native`修飾子をつける

[コンポーネント — Vue.js](https://jp.vuejs.org/v2/guide/components.html#%E3%83%8D%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%81%A8%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E3%83%90%E3%82%A4%E3%83%B3%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0)


```
<btn-component @click.native="onClick">ボタン</btn-component>
```

上のように、呼び出したコンポーネントに直接ネイティブのイベントで何かさせたい場合は`native`修飾子をつける必要がある。
