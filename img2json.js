import child_process from 'child_process';
import fs from 'fs';
import sharp  from 'sharp';
import fetch from 'node-fetch';


//Reference: Slippy map tilenames
//https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
const lon2tile = (lon,zoom) => { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }

const lat2tile = (lat,zoom) => { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

const lon2tiled = (lon,zoom) => { return ((lon+180)/360*Math.pow(2,zoom)); }

const lat2tiled = (lat,zoom) => { return ((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)); }

const tile2long = (x,z) => { return (x/Math.pow(2,z)*360-180); }

const tile2lat  = (y,z) => {
  const n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}



const infoFromColor = ( r, g, b ) => {
  
  if(r == 247, g == 245, b == 169){
    return 0.5;
  }else if(r == 255, g == 216, b == 192){
    return 3;
  }else if(r == 255, g == 183, b == 183){
    return 5;
  }else if(r == 255, g == 145, b == 145){
    return 10;
  }else if(r == 255, g == 133, b == 201){
    return 20;
  }else if(r == 220, g == 122, b == 220){
    return 30;
  }else{
    return -99;
  }
  
  
  /*
  <0.5  #F7F5A9 247, 245, 169
  0.5-3 #FFD8C0 255, 216, 192
  3-5   #FFB7B7 255, 183, 183
  5-10  #FF9191 255, 145, 145
  10-20 #F285C9 242, 133, 201
  20<   #DC7ADC 220, 122, 220
  */
  
}


  
const img2json = (z, x, y) => {

  let res = "";


  const url = `https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/${z}/${x}/${y}.png`;

  const promiseSet = [];

  fetch( url )
    .then(response => {
      console.log(`${z}/${x}/${y} -> ${response.statusText}`);
      return response.blob();
    })
    .then( blob => {
      return blob.arrayBuffer();
    })
    .then( data => {
      
      const buf = new Uint8Array(data);
      
      return sharp( buf )
        .raw()
        .toBuffer()
        
    })
    .then( buf => {
      
      const ch = buf.length / ( 256 * 256 );
      
      for( let i = 0; i < buf.length / ch; i++ ){
        const [ r, g, b ] = [ buf[ i * ch ], buf[ i * ch + 1 ], buf[ i * ch + 2 ] ];
        
        const dp = infoFromColor( r, g, b );
        
        const xx = x + (i % 256) / 256;
        const yy = y + Math.floor(i/256)/256;
        
        const tx1 = tile2long(xx, z);
        const tx2 = tile2long(xx + 1/256, z);
        const ty1 = tile2lat(yy, z);
        const ty2 = tile2lat(yy + 1/256, z);
        
        
        let geojson = {
          "type": "Feature",
          "properties": {
            "depth": dp,
            "r": r,
            "g": g,
            "b": b,
            //"x": xx,
            //"y": yy
          },
          "geometry": { 
            "type": "Polygon",
            "coordinates": [[
              [tx1, ty1],
              [tx2, ty1],
              [tx2, ty2],
              [tx1, ty2],
              [tx1, ty1]
            ]]
          }
        };
        
        //console.log(geojson.geometry.coordinates[[0]]);
        
        res += JSON.stringify(geojson) + "\n";
        
      }
      
      return Promise.resolve();
      
    })
    .then( v => {
      fs.writeFileSync(`./dst/${z}-${x}-${y}.ndjson`, res);
    })
    .catch( e => {
      console.log(`ERROR ${z}/${x}/${y}`);
      console.log(e);
    });

}


for( let xi = 7270; xi < 7280; xi++){
  for( let yi = 3216; yi < 3230 ; yi++){
  
    img2json(13, xi, yi);
  
  }
}





