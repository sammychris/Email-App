const oauth2Client = require('./oauth2Client');


function generateQuickToken(req, res){ // get google code from url and generate a for user...
	const { code } = req.query;

	console.log(code);
	
	oauth2Client.getToken(code, (err, tokens) => {
		if (err) return console.error('Error retrieving access token', err);
		// This will provide an object with the access_token and refresh_token.
		// Save these somewhere safe so they can be used at a later time.
		oauth2Client.setCredentials(tokens);  

		res.json(tokens);
		
	});
}

module.exports = generateQuickToken;
