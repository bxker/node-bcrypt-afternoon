const express = require('express');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const app = express();

//controllers
const {register, login, logout} = require('./controllers/authController');
const {dragonTreasure} = require('./controllers/treasureController');

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;

//database
massive(CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Connected to database")
});

//middleware
app.use(express.json());

app.use(session({
    resave: false, 
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7
    },
    secret: SESSION_SECRET
}));

//endpoints
//auth
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/logout', logout);

//dragon
app.get('/api/treasure/dragon', dragonTreasure);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
});