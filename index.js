/*jshint esversion: 6*/

const express = require('express');
const app = express();
//const db = require('./models');
const PORT = process.envPORT || 6969;

app.listen(6969, () =>{
  console.log(`server listening on port: ${PORT}`);
});
