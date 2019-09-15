let usersOnly = (req, res, next) => {
    if(!req.session.user){
        return res.status(401).json('Please log in')
    }
    next();
}

let adminsOnly = (req, res, next) => {
    if(!req.session.user.isAdmin){
        return res.sendStatus(403)
    }
    next()
}

module.exports = {
    usersOnly,
    adminsOnly
}