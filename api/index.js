const express = require('express');
const Router  = express.Router();

Router.use('/Contractors', require('./Contractors'));
Router.use('/Equipment', require('./Equipment'));

module.exports = Router;