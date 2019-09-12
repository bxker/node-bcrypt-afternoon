async function dragonTreasure(req, res){
    const db = req.app.get('db');
    const treasure = await db.get_dragon_treasure(1);
    res.status(200).json(treasure)
}

async function getUserTreasure(req,res){
    const db = req.app.get('db');
    const treasure = await db.get_user_treasure(req.session.user.id)
    res.status(200).json(treasure)
}

module.exports = {
    dragonTreasure
}