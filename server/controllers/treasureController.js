async function dragonTreasure(req, res){
    const db = req.app.get('db');
    const treasure = await db.get_dragon_treasure(1);
    res.status(200).json(treasure)
}

async function getUserTreasure(req,res){
    const db = req.app.get('db');
    const {id} = req.session.user;
    const treasure = await db.get_user_treasure(id)
    res.status(200).json(treasure)
}

async function addUserTreasure(req, res){
    const db = req.app.get('db');
    const { treasureURL } = req.body;
    const { id } = req.session.user;
    const treasure = await db.add_user_treasure(treasureURL, id);
    return res.status(200).json(treasure);
}

module.exports = {
    dragonTreasure,
    getUserTreasure,
    addUserTreasure
}