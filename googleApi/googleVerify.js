const db 		   = require('../models');
const oauth2Client = require('./oauth2Client');


function googleVerify(req, res, next) {

	const { tokens, userId } = req.headers; // "id" to find "user" and save "tokens"

	oauth2Client.on('tokens', (tokens) => {

		db.User.findById(userId).then(user => { // save the token so that it can be used late...
			
			if (tokens.refresh_token) {
				// store the refresh_token in my database!
				console.log('refresh_token');
				user.tokens.refresh_token = tokens.refresh_token;

				oauth2Client.setCredentials({
				 	refresh_token: tokens.refresh_token // `STORED_REFRESH_TOKEN`
				});
			}

			console.log('tokens.access_token');
			user.tokens.access_token = tokens.access_token;

			user.save()
				.then(() => {
				 	req.tokens = tokens; // passing tokens to next route
				 	next(); // move to the next method
				});
		});
	});

	req.tokens = tokens; // passing tokens to next route
	next(); // move to the next method
}

module.exports = googleVerify;
