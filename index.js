/*jshint esversion: 6*/

const express = require('express');
const app = express();
//const db = require('./models');
const PORT = process.envPORT || 3000;

app.listen(3000, () =>{
  console.log(`server listening on port: ${PORT}`);
});
