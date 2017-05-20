/*jshint esversion: 6*/

const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.envPORT || 6969;
const bodyParser = require('body-parser');

app.use(bodyParser.json({extended: true}));

app.use('/api', require('./api'));

app.listen(6969, () =>{
  console.log(`server listening on port: ${PORT}`);
  db.sequelize.sync({forceSync: true});
});
