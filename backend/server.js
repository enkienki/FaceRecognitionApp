const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

const handleRegister = require('./controllers/register')
const handleSignin = require("./controllers/signin")
const handleProfile = require('./controllers/profile')
const image = require('./controllers/image')

var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'smart-brain' 
    }
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

const cors = require('cors')

app.use(cors())
app.use(express.json())

// routes
app.get('/', (req, res) => res.send(database.users))
app.post('/signin', (req, res) => handleSignin(req, res, knex, bcrypt))
app.post('/register', (req, res) => handleRegister(req, res, knex, bcrypt, saltRounds))
app.get('/profile/:id', (req, res) => handleProfile(req, res, knex))
app.put('/image', (req, res) => image.handleImage(req, res, knex))
app.post('/imageurl', (req, res) => image.handleAPICall(req, res))

app.listen(PORT, () => {console.log(`App listen on port ${PORT}`)})