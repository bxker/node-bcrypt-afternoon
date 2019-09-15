const bcrypt = require('bcryptjs');


async function register(req, res){
    const {username, password, isAdmin} = req.body;
    const db = req.app.get('db');
    let result = await db.get_user(username)
    let exitstingUser = +result[0].count
    console.log(exitstingUser)
    if(exitstingUser === 0){
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password, salt);
        const registerTheUser = await db.register_user([isAdmin, username, hash]);
        const user = registerTheUser[0];
        req.session.user = {
            isAdmin: user.is_admin, 
            username: user.username,
            id: user.id
        }
        res.status(200).json(req.session.user)
    }else {
        return res.status(409).json('Username taken')
    }
}

async function login(req, res){
    const {username, password} = req.body;
    const db = req.app.get('db');

    let foundUser = await db.get_user_login(username);
    console.log(foundUser)
    let hash = foundUser[0].hash;
    let user = foundUser[0];
    const areEqual = await bcrypt.compare(password, hash);
    if(areEqual){
        req.session.username = username;
        console.log(req.session.user)
        req.session.user = {
            isAdmin: user.is_admin, 
            username: user.username,
            password: user.hash
        }
        res.status(200).json(req.session.user)
    } else {
        res.status(403).json('Unable to login. Username or Password are incorrect.')
    }
}

function logout(req, res){
    req.session.destroy();
    res.sendStatus(200);
}



module.exports = {
    register,
    login,
    logout
}