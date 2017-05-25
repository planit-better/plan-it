/*jshint esversion: 6 */
const express = require('express');
const Router  = express.Router();

Router.use('/Contractors', require('./Contractors'));
Router.use('/Equipment', require('./Equipment'));
Router.use('/Guest', require('./Guest'));
Router.use('/Menu', require('./Menu'));
Router.use('/Task', require('./Task'));
Router.use('/User', require('./User'));
Router.use('/Event', require('./Event'));

module.exports = Router;