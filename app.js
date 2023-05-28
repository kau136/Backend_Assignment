const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const movieRoutes = require('./router/movieDataRoute')
const Data = require("./connection").con

app.use(bodyparser.json());

app.use('/', movieRoutes);

app.listen(3000, () => 
console.log('Express server is runnig at port no : 3000')
);

