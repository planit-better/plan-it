/*jshint esversion: 6*/
'use strict';

const yelp = require('yelp-fusion');
const apiKeys = require('../../protection/api_keys.json')

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = apiKeys.Client_ID;
const clientSecret = apiKeys.Client_Secret;

const searchRequest = {
  term:'bars',
  location: 96789,
  limit: 5,
  price: "1"//price can only be searched by either "1"; "2"; "3"; or "4"

};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  }).catch(error => {
    console.log(error);
  })
}).catch(e => {
  console.log(e);
});