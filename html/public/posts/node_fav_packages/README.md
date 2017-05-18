# node.jsで気に入ったパッケージ

備忘録のため、メモ程度に残しておく

## cheerio-httpcli

npm: [cheerio-httpcli](https://www.npmjs.com/package/cheerio-httpcli)

取得したHTMLを、jQueryライクに探索することが出来る。

スクレイピングする際に最高。

製作者による記事：[Node.js用のスクレイピングモジュール「cheerio-httpcli」の紹介 - Qiita](http://qiita.com/ktty1220/items/e9e42247ede476d04ce2)

## node-twitter-api

[reneraab/node-twitter-api: Simple module for using Twitter's API in node.js](https://github.com/reneraab/node-twitter-api)

このパッケージ一つで認証からAPI叩く所まで全て賄える。他のパッケージ探した限りでは認証用のパッケージとAPI叩く（ラッパー的な）用のパッケージ２種類使わないといけない感じでちょっと微妙だった。

ただ残念ながらREADMEに書いている通り既にメンテナンスされていない。

コードが千行程度で割りと短いので、自分で読んで一度理解しておくのもいいかもと思った。
