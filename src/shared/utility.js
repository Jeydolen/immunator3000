// ASKIP FO FAIR UN NAMESPASS

const V2 = (x,y) =>
{
    return new Phaser.Math.Vector2(x,y)
}

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


exports.V2 = V2;
exports.randInt = randInt;
exports.getVectorApex = getVectorApex;