const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
// require('./model/userSchema');
require('./db/conn');
// require('./router/auth');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE;
const PORT = process.env.PORT;

const middleware = (req, res, next) => {
    console.log("It's middleware");
    next();
}

app.use(express.json());
app.use(require('./router/auth'));

app.get('/', (req, res) => {
    res.send(`HEllo world!`);
});

app.get('/about', middleware, (req, res) => {
    res.send(`HEllo world! about`);
});

app.get('/contact', (req, res) => {
    res.send(`HEllo world! contact`);
});

app.get('/login', (req, res) => {
    res.send(`HEllo world! login`);
});

app.get('/register', (req, res) => {
    res.send(`HEllo world! register`);
});

app.listen(3000, () => {
    console.log(`It's working on port ${PORT}`);
});