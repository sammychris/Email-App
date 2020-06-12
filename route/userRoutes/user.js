const db	 = require('../../models');
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const oauth2Client = require('../../googleApi/oauth2Client');


// generate a url that asks permissions for Google mails scopes
const scopes = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify',
'https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send'];


const url = oauth2Client.generateAuthUrl({
	access_type: 'offline', scope: scopes
});





function quickAuth(req, res) { // This is for creating of quick tokens for google verification...
	// for quick url...
	res.redirect(url);
}






require('dotenv').config();

function register(req, res){ // CREATE A USER

	const { firstname, lastname, email, password } = req.body;

	db.User.findOne({ email })
		.then(user => {

			const pay_load = {};

			// check if user already exits!
			if(user) return res.json({ message: 'User already exists!' });

			bcrypt.hash(password, 12).then(hash => {

				// create new user
				const newUser = db.User({ 
					firstname, lastname, email, password: hash
				});

				pay_load.id 		= newUser.id;
			    pay_load.firstname 	= newUser.firstname;
			    pay_load.lastname 	= newUser.lastname;
			    pay_load.email 		= newUser.email;
			    pay_load.password 	= newUser.password;

			    // create a jwt token If a user successfully registered.
				const token = jwt.sign(pay_load, process.env.JWT_SECRET);

				const data = {
					firstname: user.firstname,
					lastname: user.lastname,
					email   : user.email,
				}

				newUser.save()
					.then(() => {

						res.cookie('jwt', token);
					
						res.json({ user: data, url }); // send the "url" to help users connect to their google account
					})
					.catch(err => res.status(401).json({ err })); 

			}).catch(err => console.error(err));

		});
}


function login(req, res) { // LOGIN A USER

	const { email, password } = req.body;

	db.User.findOne({ email })

		.then(user => {  // check for user's password...
			
			const pay_load = {};

			// check if user already exits!
				if(!user) return res.json({ message: 'User does not exists!' });

				// compare password
    			bcrypt.compare(password, user.password).then(passed => {
					// passed is equal to false...
					if(!passed) return res.json({ message: '!Wrong Password!'});

					pay_load.id 		= user.id;
				    pay_load.firstname 	= user.firstname;
				    pay_load.lastname 	= user.lastname;
				    pay_load.email 		= user.email;
				    pay_load.password 	= user.password;

					// loggedin successs and create a jwt token
					const token = jwt.sign(pay_load, process.env.JWT_SECRET);

					const data = {
						firstname: user.firstname,
						lastname: user.lastname,
						email   : user.email,
					}

					res.cookie('jwt', token); // creating cooking for the user...

					// check if the user has google token
					if(!user.tokens) return res.json({ user: data, url }); // send the "url" to help users connect to their google account
					
					return res.json({ user: data, isGoogleVerified: true}); 

				}).catch(err => console.error(err));

		})
		.catch(err => res.status(401).json({ err }));
}



function getUser(req, res) { // Find A USER
	const { user } = req;	
	// check if user already exits!
	if (!user) return res.json({ message: 'User does not exists!' });
	return res.json({ user }); 
}



function update(req, res) { // UPDATE A USER

	const { user }							= req;
	const { firstname, lastname, password } = req.body;
			
	// check if user already exits!
	if (!user) return res.json({ message: 'User does not exists!' });

	user.firstname = firstname || user.firstname;
	user.lastname  = lastname  || user.lastname;

	if (password) {// password hash before save
		return bcrypt.hash(password, 12).then(hash => {

			user.password = hash; // user hash password!!!

			user.save()
				.then(result => res.json({ result }))
				.catch(err => res.status(401).json({ err })); 

		}).catch(err => console.error(err));
	}
	else { // just save without hashing the password...
		user.save()
			.then(result => res.json({ result }))
			.catch(err => res.status(401).json({ err })); 
	}
}



// function allUsers(req, res) { // Find All USERS --- This should be for Admin...

// 	db.User.find({})
// 		.then(users => res.json({ users }))
// 		.catch(err => res.status(401).json({ err }));
// }


module.exports = { register, login, update, getUser, quickAuth };
