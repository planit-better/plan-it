/*jshint esversion: 6 */
var twilioAccount = require('../protection/twilioAccount.json');
var accountSid = twilioAccount.accountSid;
var authToken = twilioAccount.authToken;

let what = 'Graduation party';
let where = 'waikiki';
let when = '05/04/2017';

var client = require('twilio')(accountSid, authToken);

var numbers = twilioAccount.numbers;
console.log(numbers);

const groupText = num => {

  client.messages.create({
    messagingServiceSid: 'MGbe98cfd9d65efc10205750828083e11f',
    to:  num,
    from: '+16152191888',

    body:
    ` you have been invited to ${what} ` +
    `at ${when}` +
    ` location ${where} ` +
    ' https://Facebook.com'

  }, function(err, message) {
    console.log(message);
  });
};

const getNumber = params  => {
  for(let i = 0; i < params.length; i++) {
    groupText(params[i]);
  }
};
getNumber(numbers);