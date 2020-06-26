const db 		   = require('../models');
const oauth2Client = require('./oauth2Client');


function generateGoogleToken(req, res){ // get google code from url and generate a for user...
	const { code } = req.query;
	const { user } = req;

	oauth2Client.getToken(code, (err, tokens) => {
		if (err) return console.error('Error retrieving access token', err);
		// This will provide an object with the access_token and refresh_token.
		// Save these somewhere safe so they can be used at a later time.
		oauth2Client.setCredentials(tokens);  

		console.log(tokens);
		
		user.tokens = tokens;
		user.save()
			.then(() => res.redirect('http://localhost:3000/authenticategoogle?googleToken=true'))
			.catch(err => res.status(401).json({ err })); 
		
	});
}

module.exports = generateGoogleToken;
