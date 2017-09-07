# [その他]全般的なメモ


## Git関係

### コミットをまとめる

```
git rebase -i HEAD~[まとめる数]
```

vimが開かれるので、ベースにするコミットは`pickup`のままで、それ以外を`fixup` or `f` に書き換えて`:wq`


### 直前のコミットのコメントを修正

```
git commit --amend -m "[新しいコメント]"
```

### git pullを使わない方法

`fetch`を使用する

```
git checkout [対象ブランチ]
git fetch
git merge ～/～
```

### 特定のファイルの履歴を追いかけたい

```
git log -p [ファイル名]
```

これだけだと、ターミナル上でズラッと表示されてしまい、履歴が長い場合は追いきれなくなるので

```
git log -p [ファイル名] | vim -
```

とすれば`vim`に履歴が表示される。






## その他

### gistコマンドで簡単にソースコード共有

ネット上のコミュニケーションとかで短いソースコードの共有をしたい時にGistを使えば便利。

それをCUIからさくっとする方法。

### やり方

```
gem install gist

gist [対象ファイル]

# アップロードされたURLが表示される
```

### 参考

[ターミナルからGistに投稿 - Qiita](http://qiita.com/smison/items/d7fdec3a1b74a0d22c36)
