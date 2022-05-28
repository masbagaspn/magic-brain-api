const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const knex = require('knex');
require('dotenv').config();

const signin = require('./controller/signin');
const register = require('./controller/register');
const image = require('./controller/image');
const { success, error } = require('./response');
const clarifai = require('./controller/clarifai');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: process.env.DATABASE_USERNAME,
        port: Number(process.env.DATABASE_PORT),
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
})

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.post('/', (req, res) => console.log('it is working!'))
app.post('/signin', (req, res) => {signin.handleSignInPost(req, res, db, bcrypt, success, error)})
app.post('/register', (req, res) => {register.handleRegisterPost(req, res, db, bcrypt, success, error)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db, success, error)})
app.put('/image', (req, res) => {image.handleImagePut(req, res, db, success, error)})
app.post('/clarifai', (req,res) => {clarifai.handleClarifaiApiCall(req, res, success, error, process.env.API_KEY)})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
});