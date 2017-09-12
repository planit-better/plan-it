/*jshint esversion: 6 */
var twilioAccount = require('../protection/twilioAccount.json');
var accountSid = twilioAccount.accountSid;
var authToken = twilioAccount.authToken;

let what = 'Devleague full time';
let where = '2800 Woodlawn dr';
let when = 'Tomorrow';

var client = require('twilio')(accountSid, authToken);

const groupText = (num, message, event, user) => {
  console.log(`NUMBER: ${num}`);
  console.log(`MESSAGE: ${message}`);
  console.log(`EVENT: ${event}`);
  console.log(`USER : ${user}`);
  client.messages.create(
  {
    to:  num,
    from: '+18722013106',

    body: `New Message from ${user} regarding ${event} : ${message}`


  }, function(err, message) {
    console.log(`ERR: ${err}`);
  }
  );
};

const getNumber = (params, message, event, user )  => {
  console.log(`GUESTS: ` + params[0]);
  console.log("GET MESSAGE : " + message);
  console.log(`EVENT: ${event}`);
  console.log(`USER: ${user}`);


 for(let i = 0; i < params.length; i++) {
    console.log(params[i].number);
    groupText(params[i].number, message, event, user);
  }
};


module.exports = {
  groupText,
  getNumber
};