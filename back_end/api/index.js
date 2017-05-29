/*jshint esversion: 6 */
const express = require('express');
const Router  = express.Router();

Router.use('/Contractors', require('../models/Contractors'));
Router.use('/Equipment', require('../models/Equipment.js'));
Router.use('/Guest', require('../models/Guest.js'));
Router.use('/Menu', require('../models/Menu.js'));
Router.use('/Task', require('../models/Task.js'));
Router.use('/User', require('../models/users.js'));
//Router.use('/text', require('../text-reminder/text.js'));
//Router.use('/email', require('../evite/email.js'));
Router.use('/Event', require('../models/Event.js'));


module.exports = Router;