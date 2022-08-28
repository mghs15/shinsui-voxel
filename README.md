# shinsui-voxel
浸水推定図をボクセル風に3Dにしてみるテスト

## 注意：実際のリスク評価に使わないこと
* 建物の高さは実際の高さを示していないので注意
* 浸水深は、幅のあるデータを適当な数値で代表させているので注意

## 使用データ・ライブラリ等
* 洪水浸水想定区域（想定最大規模） https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin
* sharp https://www.npmjs.com/package/sharp
* node-fetch https://www.npmjs.com/package/node-fetch
* tippecanoe https://github.com/mapbox/tippecanoe

* 地理院地図Vector https://maps.gsi.go.jp/vector/
* mapbox gl js https://github.com/mapbox/mapbox-gl-js
