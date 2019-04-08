const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
	client: 'pg',
    connection: {
    connectionString : postgres://feztpmdruenffa:3e00d3dabe733fa25a24ecdfeaff293a9745c7159e4c3af7167ce47d7b48bd4f@ec2-54-225-129-101.compute-1.amazonaws.com:5432/d70dnfm9qqlluo
      ssl:true,
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
app.listen(process.env.PORT || 3001, () => {
	console.log( process.env.DATABASE_URL);
});



