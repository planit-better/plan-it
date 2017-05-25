/*jshint esversion: 6*/

const apiKeys = require('../protection/api_keys.json');
const eviteApiKey = apiKeys.apiKey;
const domain = apiKeys.domain;
const path = require('path');
const mailComposer = require('mailcomposer');//need to npm install mailcomposer --save
const emailList = [];//dont need because sequalize
const nameList = [];//dont need because sequalize
const PORT = process.env.PORT || 1995;
const db = require('../db/connection.js');
const express = require('express');
const mailgun = require("mailgun-js") ({apiKey: eviteApiKey, domain: domain});

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

const getMailingList = () => {

  return db.query('SELECT * FROM users');
};

const evite = (name, email) => {
  const filePath = path.join('public','assets', 'test.png');
  const mail = mailComposer({
    from: '<planitbetterevite@gmail.com>',
    to: email,
    subject: 'Hello',
    attachment: filePath,
    html: `<a href='http://www.google.com'><img src='http://nerdist.com/wp-content/uploads/2016/08/Star-Wars-The-Force-Awakens-Poster.jpg' alt='nothing'></a><b>hello ${name}, you are being sent this email as a test</b>`,
  });//html is where the email text body is being inputted.

  mail.build(function(mailBuildError, message) {

    const dataToSend = {
      to: email,
      message: message.toString('ascii')
    };

    mailgun.messages().sendMime(dataToSend, function (error, body) {
      if(error) {
        console.log(error);
      }
      console.log(body);
    });
  });
};

app.post('/test', (req, res ) => {
  getMailingList()
    .then(reqResponse => {//<=====reqResponse contains the table info
      for(let i = 0; i < reqResponse.length; i++) {
        const email = emailList.push(reqResponse[i].email);
        const name = nameList.push(reqResponse[i].name);
      }
    })
    .then(() => {
      for(let i = 0; i < emailList.length; i++) {
        evite(nameList[i], emailList[i]);//can use 'name' to make emails more personable
      }
    })
    .catch(error => {
      console.log(error);
    });

  res.send('ok');
});

module.exports = {
  evite
};

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});