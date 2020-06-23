const {google}    = require('googleapis');
const credentials = require('../credentials.json').web;


const oauth2Client = new google.auth.OAuth2(
	credentials.client_id,   	// YOUR_CLIENT_ID,
	credentials.client_secret,  // YOUR_CLIENT_SECRET
	credentials.redirect_uris	// YOUR_REDIRECT_URL
);


module.exports = oauth2Client;
