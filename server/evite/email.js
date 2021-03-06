/*jshint esversion: 6*/

const apiKey = require('../protection/api_keys.json');
const path = require('path');
const mailComposer = require('mailcomposer');//need to npm install nodemailer --save
const express = require('express');
const mailgun = require("mailgun-js") ({apiKey: apiKey.apiKey, domain: apiKey.domain});

const evite = (name, email, message) => {
  const filePath = path.join('public','assets', 'test.png');
  const mail = mailComposer({
   from: '<planitbetterevite@gmail.com>',
   to: email,
   subject: `Hello ${name}`,
   attachment: filePath,
   html: `<a href='http://www.google.com'><img src='http://elizabethbcrook.com/wp-content/uploads/you-are-invited1.jpeg' alt='nothing'></a><br><b>${message}</b>
     <p>Sincerly,</p>
     <p>planbetter.events</p>`,
  });//html is where the email text body is being inputted.

  mail.build(function(mailBuildError, message) {
  const dataToSend = {
   to: email,
   message: message.toString('ascii')
   };
  mailgun.messages().sendMime(dataToSend, function (error, body) {
    if(error) {
    }
    });
  });
};

const getEmails = (emails, message) => {
  for(let i = 0; i < emails.length; i++) {
    console.log(emails[i].name);
    evite(emails[i].name, emails[i].email, message);
  }
};

module.exports = {
  evite,
  getEmails
};


