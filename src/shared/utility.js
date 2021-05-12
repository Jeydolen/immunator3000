// ASKIP FO FAIR UN NAMESPASS

const V2 = (x,y) => {return new Phaser.Math.Vector2(x,y)}

const randInt = (min, max) =>
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getVectorApex = (v_norm,a) =>
{
    return new Phaser.Math.Vector2(Math.cos(a) * v_norm,Math.sin(a) * v_norm);
} // getVectorApex()

const ASSET_SIZE =
{
    "gun": V2(64,64),
    "Ab": V2(15,15),
    "virus_arrow": V2(60,60),
}

const VP_SIZE = V2(1024,768);

const CardinalPointToVPPos = (cardinal, sprite_name) =>
{ 
    switch(cardinal)
    {
        case 'N' : return V2(VP_SIZE.x/2 - ASSET_SIZE[sprite_name].x/2,                ASSET_SIZE[sprite_name].y/2);
        case 'S' : return V2(VP_SIZE.x/2 - ASSET_SIZE[sprite_name].x/2,  VP_SIZE.y   - ASSET_SIZE[sprite_name].y/2);
        case 'W' : return V2(              ASSET_SIZE[sprite_name].x/2,  VP_SIZE.y/2 - ASSET_SIZE[sprite_name].y/2);
        case 'E' : return V2(VP_SIZE.x   - ASSET_SIZE[sprite_name].x/2,  VP_SIZE.y/2 - ASSET_SIZE[sprite_name].y/2);
        default:   return V2(0,0)
    }
}// CardinalPointToVPPos


exports.V2 = V2;
exports.randInt = randInt;
exports.getVectorApex = getVectorApex;
exports.CardinalPointToVPPos = CardinalPointToVPPos;
exports.ASSET_SIZE = ASSET_SIZE;
exports.VP_SIZE = VP_SIZE;