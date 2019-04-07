const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT



const db = knex({
	client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Z1ggyZ1ggy*',
    database : 'smartbrain'
	}
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=>{res.send('it is working') });
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register',(req, res) => {register.handleRegister(req, res, db,bcrypt)}); //dependency injection
app.get('/profile/:id', (req, res) =>{profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
app.listen(PORT || 3001, () => {
	console.log('app is running on port not specified');
});



