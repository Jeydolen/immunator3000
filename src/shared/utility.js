// ASKIP FO FAIR UN NAMESPASS
const DEBUG = true;
const V2 = (x,y) => {return new Phaser.Math.Vector2(x,y)};
const ASSET_SIZE =
{
    "gun": V2(55,55),
    "Ab": V2(7,8),
    "virus_arrow": V2(30,30),
    "target_arrow": V2(30,60)
}
const VP_SIZE = V2(1200,900);
const CARDINAL_POINTS = ['N', 'E', 'S', 'W','NE','NW','SE','SW'];

const randInt = (min, max) =>
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



const getVectorApex = (v_norm,a) =>{return new Phaser.Math.Vector2(Math.cos(a) * v_norm,Math.sin(a) * v_norm);} // getVectorApex()

const CardinalPointToVPPos = (cardinal, sprite_name) =>
{ 
    switch(cardinal)
    {
        case 'N' : return V2(VP_SIZE.x/2 - ASSET_SIZE[sprite_name].x/2,                ASSET_SIZE[sprite_name].y/2);
        case 'S' : return V2(VP_SIZE.x/2 - ASSET_SIZE[sprite_name].x/2,  VP_SIZE.y   - ASSET_SIZE[sprite_name].y/2);
        case 'W' : return V2(              ASSET_SIZE[sprite_name].y/2,  VP_SIZE.y/2 - ASSET_SIZE[sprite_name].y/2);
        case 'E' : return V2(VP_SIZE.x   - ASSET_SIZE[sprite_name].y/2,  VP_SIZE.y/2 - ASSET_SIZE[sprite_name].y/2);

        case 'NE': return V2(0,0);
        case 'NW': return V2(ASSET_SIZE[sprite_name].x,0);
        case 'SE': return V2(0,  VP_SIZE.y - ASSET_SIZE[sprite_name].y);
        case 'SW': return V2(ASSET_SIZE[sprite_name].x,  ASSET_SIZE[sprite_name].y);
        default:   return V2(0,0)
    }
}// CardinalPointToVPPos

const CardinalPointToDeg = (cardinal) =>
{
    switch(cardinal)
    {
        case 'N'  : return  180;
        case 'S'  : return  0;
        case 'W'  : return  90;
        case 'E'  : return -90;
        case 'NE' : return  225;
        case 'SE' : return -45;
        case 'NW' : return -135;
        case 'SW' : return  45;
        default   : return  0;
    }
}// CardinalPointToDeg


exports.V2 = V2;
exports.randInt = randInt;
exports.getVectorApex = getVectorApex;
exports.CardinalPointToVPPos = CardinalPointToVPPos;
exports.CardinalPointToDeg = CardinalPointToDeg;
exports.ASSET_SIZE = ASSET_SIZE;
exports.VP_SIZE = VP_SIZE;
exports.CARDINAL_POINTS = CARDINAL_POINTS;
exports.DEBUG = DEBUG;