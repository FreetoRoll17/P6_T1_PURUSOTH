
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const userRoutes = require('./routes/user')
const saucesRoutes = require('./routes/sauces')


const app = express();


//Mongosse 
mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_MPD}@${process.env.MDB_HOST}/${process.env.MDB_DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.static('public'));



app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
//console.log(path);

app.use('/api/auth', userRoutes);

app.use('/api/sauces', saucesRoutes);

module.exports = app 