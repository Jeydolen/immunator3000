import { randInt } from "./utility";
export default class Map {
    constructor(map_data)
       {
            this.map_data          = map_data
            this.width             = map_data.width;
            this.height            = map_data.height;
            this.tile_width        = map_data.tileWidth;
            this.tile_height       = map_data.tileHeight;
            this.entry             = randInt(1,4)
            this.exit              = randInt(1,4)  
       }

       getTileAtPoint(vector)
       {
              let tile_x = (vector.x / this.tile_width).toFixed(0);
              let tile_y = (vector.y / this.tile_height).toFixed(0);
              return this.map_data.layers[0].data[tile_y][tile_x]
       }

       getStructure(){console.dir(this.map_data)}
}

const JSON_Structure_Template = { "compressionlevel":-1,
"editorsettings":
   {
    "export":
       {
        "format":"json",
        "target":"map2.json"
       }
   },
"height":60,
"infinite":false,
"layers":[{"data":[],
        "height":60,
        "id":1,
        "name":"Membrane + cell",
        "opacity":1,
        "type":"tilelayer",
        "visible":true,
        "width":80,
        "x":0,
        "y":0
       }],
"nextlayerid":2,
"nextobjectid":1,
"orientation":"orthogonal",
"renderorder":"right-down",
"tiledversion":"1.5.0",
"tileheight":30,
"tilesets":[
       {
        "columns":6,
        "firstgid":1,
        "image":"tileset.png",
        "imageheight":30,
        "imagewidth":180,
        "margin":0,
        "name":"tileset",
        "spacing":0,
        "tilecount":6,
        "tileheight":30,
        "tiles":[
               {
                "id":0,
                "properties":[
                       {
                        "name":"collide",
                        "type":"bool",
                        "value":true
                       }]
               }, 
               {
                "id":1,
                "properties":[
                       {
                        "name":"collide",
                        "type":"bool",
                        "value":true
                       }]
               }, 
               {
                "id":2,
                "properties":[
                       {
                        "name":"collide",
                        "type":"bool",
                        "value":true
                       }]
               }, 
               {
                "id":3,
                "properties":[
                       {
                        "name":"collide",
                        "type":"bool",
                        "value":true
                       }, 
                       {
                        "name":"heat",
                        "type":"bool",
                        "value":false
                       }]
               }, 
               {
                "id":4,
                "properties":[
                       {
                        "name":"collide",
                        "type":"bool",
                        "value":true
                       }, 
                       {
                        "name":"heat",
                        "type":"bool",
                        "value":true
                       }]
               }, 
               {
                "id":5,
                "properties":[
                       {
                        "name":"heat",
                        "type":"bool",
                        "value":true
                       }]
               }],
        "tilewidth":30
       }],
"tilewidth":30,
"type":"map",
"version":1.5,
"width":80
};

//https://en.wikipedia.org/wiki/Procedural_generation