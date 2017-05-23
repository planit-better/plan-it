/*jshint esversion: 6*/

const apiKey = 'key-2896e6a29c751cd14ba171a4e2b5fc14';
const domain = 'sandbox61f7636070354820959d4806b06ad4c1.mailgun.org';
const path = require('path');
const mailComposer = require('mailcomposer');//need to npm install nodemailer --save

const emailList = ['faceme808@gmail.com', 'akonidavis@gmail.com', 'michaelanguay@outlook.com'];
const PORT = process.env.PORT || 1994;
const express = require('express');
const mailgun = require("mailgun-js") ({apiKey: apiKey, domain: domain});
const emailList = ['akonidavis@gmail.com', 'acdoyle630@gmail.com', 'michaelanguay@outlook.com', 'andrew.tram@yahoo.com'];

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/test', (req, res ) => {

  const evite = (email) => {
    const filePath = path.join('public','assets', 'test.png');

    const mail = mailComposer({
      from: '<planitbetterevite@gmail.com>',
      to: email,
      subject: 'Hello',
      text: req.body.message,
      attachment: filePath,
      html: "<a href='http://www.google.com'><img src='http://nerdist.com/wp-content/uploads/2016/08/Star-Wars-The-Force-Awakens-Poster.jpg' alt='nothing'></a><b>hello, you are being sent this email as a test</b>",
    });

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

  const getEmails = () => {
    for(let i = 0; i < emailList.length; i++) {
      console.log('hit2 ', emailList[i]);
      evite(emailList[i]);
    }
  };
  getEmails();
  
  res.send('ok');

});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});