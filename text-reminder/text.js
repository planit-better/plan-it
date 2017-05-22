var twilioAccount = require('../protection/twilioAccount.json');
var accountSid = twilioAccount.accountSid;
var authToken = twilioAccount.authToken;
console.log(accountSid);
console.log(authToken);
var client = require('twilio')(accountSid, authToken);

var numbers = twilioAccount.numbers;
console.log(numbers);

const groupText = num => {

  client.messages.create({
    messagingServiceSid: 'MGbe98cfd9d65efc10205750828083e11f',
    to:  num,
    from: '+16152191888',
    body: 'I GOT IT TO WORK FUCK YEAH!!!!!!!'
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