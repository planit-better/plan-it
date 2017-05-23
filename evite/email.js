/*jshint esversion: 6*/

const apiKey = 'key-xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const domain = 'sandbox61f7636070354820959d4806b06ad4c1.mailgun.org';
const path = require('path');
const express = require('express');
const mailgun = require("mailgun-js") ({apiKey: apiKey, domain: domain});
const emailList = ['akonidavis@gmail.com', 'acdoyle630@gmail.com', 'michaelanguay@outlook.com', 'andrew.tram@yahoo.com'];

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/test', (req, res ) => {

  const evite = (email) => {
    const filePath = path.join('public','assets', 'test.png');

    const data = {
      from: '<planitbetterevite@gmail.com>',
      to: email,
      subject: 'Hello',
      text: req.body.message,
      attachment: filePath
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });

    res.send('ok');
    };

});


