/*jshint esversion: 6 */
const express = require('express');
const Router  = express.Router();

Router.use('/contractors', require('./Contractors'));

module.exports = Router;