const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app= express();

app.use(cors());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
//inserindo o controller e repasando o app para o controller
require('./app/controllers/index')(app);

module.exports = app;
