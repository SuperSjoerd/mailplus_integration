// Include necessary packages
const crypto = require('crypto');
const OAuth = require('./vendor/oauth-1.0a.js');

// Instantiate oauth using the consumer key and secret
const oauth = OAuth({
  consumer: { key: '<<REDACTED>>', secret: '<<REDACTED>>'},
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    // Create HMAC SHA1 encoded string
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

// Build the authorization data
let authorization = oauth.authorize({
  method  : 'GET',
  url     : 'https://restapi.mailplus.nl/integrationservice-1.1.0/mailing?fromDate=2019-01-01&toDate=2019-03-01',
  data    : {}
});

// Get the authorization header and dump it to the console
let header = oauth.toHeader(authorization);
console.log(header.Authorization);