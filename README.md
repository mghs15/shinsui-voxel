# shinsui-voxel
浸水想定区域図をボクセル風に3Dにしてみるテスト

## 注意：実際のリスク評価に使わないこと
* 建物の高さは実際の高さを示していないので注意
* 浸水深は、幅のあるデータを適当な数値で代表させているので注意

## デモサイト
https://mghs15.github.io/shinsui-voxel/main.html

## 使い方
1. `img2json.js`(浸水深だけ取得)か`img2jsonWithElev.js`(浸水深と標高の両方取得)でタイルデータからGeoJSONを作成し、`dst`へ格納。
2. `tiler.js`で`dst`内のGeoJSONをベクトルタイルへ変換。

## blog
https://qiita.com/mg_kudo/items/7ee95f1d79a26d86bef2

## 使用データ・ライブラリ等
* 洪水浸水想定区域（想定最大規模） https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin
* sharp https://www.npmjs.com/package/sharp
* node-fetch https://www.npmjs.com/package/node-fetch
* tippecanoe https://github.com/mapbox/tippecanoe

* 地理院地図Vector https://maps.gsi.go.jp/vector/
* mapbox gl js https://github.com/mapbox/mapbox-gl-js
