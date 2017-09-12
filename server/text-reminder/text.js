/*jshint esversion: 6 */
var twilioAccount = require('../protection/twilioAccount.json');
var accountSid = twilioAccount.accountSid;
var authToken = twilioAccount.authToken;

let what = 'Devleague full time';
let where = '2800 Woodlawn dr';
let when = 'Tomorrow';

var client = require('twilio')(accountSid, authToken);

const groupText = (num, message/*, event, user*/) => {
  client.messages.create(
  {
    //messagingServiceSid: twilioAccount.messaging,
    to:  num,
    from: '+18722013106',

    body: message/*`New Message from ${user} regarding ${event} : ${message}`*/


  }, function(err, message) {
    console.log(`ERR: ${err}`);
  }
  );
};

const getNumber = (params, message/*, event, user*/)  => {
  console.log("GET MESSAGE : " + message);

 for(let i = 0; i < params.length; i++) {
    groupText(params[i].dataValues.number, message/*, event, user*/);
  }
};


module.exports = {
  groupText,
  getNumber
};