const express = require('express');
const Router  = express.Router();

Router.use('/Contractors', require('./Contractors'));
Router.use('/Equipment', require('./Equipment'));
Router.use('/Guest', require('./Guest'));

module.exports = Router;