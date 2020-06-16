const {google}    = require('googleapis');
const credentials = require('../credentials.json').web;
const db 		  = require('../models');

//const user = {} // assuming this is our user db...


const oauth2Client = new google.auth.OAuth2(
	credentials.client_id,   	// YOUR_CLIENT_ID,
	credentials.client_secret,  // YOUR_CLIENT_SECRET
	credentials.redirect_uris	// YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify',
'https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send'];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});


function connect(req, res){
	// token continue
	// if no token redirect...

	res.redirect(url);
}


// This will provide an object with the access_token and refresh_token.
// Save these somewhere safe so they can be used at a later time.
function tokens(req, res){
	const { code } = req.query;
	const { id }   = req.body;


	oauth2Client.getToken(code, (err, tokens) => {
		if (err) return console.error('Error retrieving access token', err);
		// This will provide an object with the access_token and refresh_token.
		// Save these somewhere safe so they can be used at a later time.
		oauth2Client.setCredentials(tokens);  // save the token so that it can be used late...

		db.User.findById(id).then(user => {
			user.tokens = tokens;
			user.save()
				.then(() => res.redirect('http://localhost:3000/'));
			
		});

	});

	// oauth2Client.on('tokens', (tokens) => {
	// 	if (tokens.refresh_token) {
	// 		// store the refresh_token in my database!
	// 		console.log(tokens.refresh_token);
	// 	}
	//  	console.log(tokens.access_token);
	// });

	// oauth2Client.setCredentials({
	//  	refresh_token: `STORED_REFRESH_TOKEN`
	// });
}


function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}


/*
All the index.js code from first article 
*/



function checkMails(callback, tokens){
    oauth2Client.setCredentials(tokens); // auth

    var obj = new db.CheckMail(oauth2Client);

    obj.checkForMediumMail();
}


function sendMails(obj, callback){
	let { tokens, data, subject, body } = obj;

    const dataVal = {};
    let emailKey;
    let nextItem = 1; 


    oauth2Client.setCredentials(tokens); // auth

    for(let key in data[0]) {
      let newKey = key.replace(/\s/g, '').toLowerCase();
      if(/email/.test(newKey)) emailKey = newKey;
      dataVal[newKey] = key;
    }

    for(let person of data) { // loop through each users
		let email = person[dataVal[emailKey]];
		let newBody = body;
		let isLastItem = !data[nextItem]; // if no next item
		for(let key in dataVal){ // loop through the body to find the variables
			const find = new RegExp(`{${key}}`,'gi');
			newBody = newBody.replace(find, person[dataVal[key]]);  // find and replace the variables
		}
		///////////////////////// (Auth, Email, Subject, Body, Mail, attachmentSrc)...
		const obj = new db.CreateMail(oauth2Client, email, subject, newBody);
		// 'mail' is the task, if not passed it will save the message as draft.
		// attachmentSrc array is optional.

		obj.makeBody(callback, isLastItem);
		nextItem++;
    }
}


function sendOneMail(object, callback){
	const { tokens, data: email, subject, body } = object;
	oauth2Client.setCredentials(tokens);

	const obj = new db.CreateMail(oauth2Client, email, subject, body);
	let isLastItem = true;
	obj.makeBody(callback, isLastItem);
}



oauth2Client.on('tokens', (tokens) => {
		if (tokens.refresh_token) {
			// store the refresh_token in my database!
			console.log(tokens.refresh_token);
		}
	 	console.log(tokens.access_token);
	});

	oauth2Client.setCredentials({
	 	refresh_token: `STORED_REFRESH_TOKEN`
	});



module.exports = { connect, tokens, sendMails, checkMails, sendOneMail };
