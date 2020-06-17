const multer 	 = require('multer');
const SSEChannel = require('sse-pubsub');
const passport   = require('passport');
const { 
	userCampaign,
	userList,
	userImage,
	userMessage,
	userSendCampaign,
	user,
} 				 = require('./userRoutes');

const {
	Gmail,
	generateGoogleToken,
	googleVerify,
	generateQuickToken,
}				 = require('../googleApi');

const channel = new SSEChannel();

require('../middleware/passportConfig');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, __dirname + '/../uploads/')
	},
	filename: function (req, file, cb) {
		const { fieldname, originalname } = file;
		if (fieldname === 'csvfile' ) return cb(null, 'contacts.csv'); // for csv file
		cb(null, fieldname + '-' + originalname); // for img file
	}
});

const uploadCsv = multer({ storage }).single('csvfile');
const uploadImage = multer({ storage }).single('imgfile');


module.exports = function (app) {

	app.post('/api/test', (req, res, next) => {
		const testoption = require('./testoption');
		const { list } = req.body;

		const ok = new testoption({
			list: ['man',12,34,223,323,1212,1212,12,1,12212,87]
		})

		req.ok = ok;

		ok.save()
			.then(result => {
				console.log(result);
				next();
			});
	},
		(req, res) => {
			console.log('welcome sir')
			req.ok.list = [1,2,2,'Jonh'];
			req.ok.save()
			.then(result => res.json({ message: 'saved Successfully!', result }));
			//res.json({ message: req.ok })
		}
	);

	app.get('/api/test', (req, res) => {
		const testoption = require('./testoption');
		testoption
			.find({})
			.then(result => res.json({ result }));
	});



	app.put('/api/test/:id', (req, res) => {
		function chunck(list, n){
		    return list.splice(0,n);
		}
		const testoption = require('./testoption');
		const { id } = req.params;
		testoption
			.findById(id)
			.then(result => {
				const { list } = result;
				console.log(chunck(list, 7));
				result.save()
					.then(resulting => res.json(resulting));
			});
	});



	app.post('/api/testmail', (req, res) => { // Sending a test Mail
		//////  Data, Subject, Body,

		const data = "sammychrise@gmail.com";
		const subject = "Thanks for using our app";
		const body = `
			<p>Good day</p>
			<p>
				This is webbiz Technologies and we are here to build a website for you sir...
			</p>
		`

		const tokens =  {
			access_token: "ya29.a0AfH6SMB4nrWb6WK1E_xmwejlQAwMfsbr7HaNb4lgpS88y04bJowfCGM8_hePJ02Vq3HgP1QR3OCNoUbqbp17r7js4a-NHmQCbmbayXueN7wXYkNf1qQ4At_X3jcJixn9_3OeoPJbQAxcSghDu5TXGd9VB3wdhlyiJxI",
			refresh_token: "1//03V4pbTpo7aDrCgYIARAAGAMSNwF-L9IrapBORTgSftg22R-itfaR0Gif93OQ9ePsGdb30M31ILs7vTjQ1stHeE2VOXg9Utmd2tE",
			scope: "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send",
			token_type: "Bearer",
			expiry_date: 1603850653056
		};

		if (!data || !subject || !body) return res.json({ message: "Underfined!!!"});

		Gmail.sendOneMail({ tokens, data, subject, body}, (err, result) => {

			if (err) return res.json({ message: '!could not send'});
			return res.json({ message: 'Test mail sent!' });

		})		
	});










	app.post('/api/quickimport', uploadCsv, function (req, res){
		const fs = require('fs')
		const csv 			= require('csvtojson');
		const csvFilePath 	= __dirname + "/../uploads/contacts.csv";

		const { name } = req.body;

	    csv()
		.fromFile(csvFilePath)
			.then(jsonObj => {
				fs.writeFile('./route/quickJson.json', JSON.stringify(jsonObj), function (err) {
					if(err) return res.json(err);
					res.json(jsonObj);
				});
			})
			.catch(err => res.status(401).json({ err: 'Could not import!' }));
	}); 



	app.post('/api/quicksend', (req, res) => {

		const subject = "Hi {firstname}! This is personally for you!";
		const body = `
			<p>Hello {firstname},</p>

			<p>Base on the current situation in the country, I and my team have thought of a way to help out business owners <br/> by offering our web design service at a very affordable price...
</p>
			<p>With just <strong>"25k"</strong>, you can get that simple and professional website for you business.</p>

			<p><strong>This offer ends in the next 3days...</strong> only for a few business owners</p>

			<p>
				Website: https://webbiztek.com <br />
				Email: hello@webbiztek.com <br />
				Phone/whatsapp: 08083013677<br />
			</p>

			<p>
				<strong>WhatSapp Us now:</strong> https://wa.me/2348083013677
			</p>

			<p>
				Samuel from Webbiz Technologies.
			</p>
		`;


// const body = `
// 			<p>Hello {firstname},</p>

// 			<p>This offer is for you, we are offer 70% discount</p>
// 			<p>With just <strong>"25k"</strong>, you can get that simple and professional website for you business.</p>

// 			<p><strong>This offer ends in the next 2days...</strong> only for a few business owners</p>

// 			<p>
// 				Website: https://webbiztek.com <br />
// 				Email: ebusameric@gmail.com <br />
// 			</p>

// 			<p>
// 				<strong>WhatSapp Us now:</strong> https://wa.me/2348083013677
// 			</p>

// 			<p>
// 				Samuel from Webbiz Technologies.
// 			</p>
// 		`;

		// const data = [
	 //        {
	 //            "firstname": "Odinakechukwu",
	 //            "lastname": "Arinze",
	 //            "email": "ebusameric@gmail.com",
	 //            "Website": "TradeDepot",
	 //            "field5": "Co-Founder",
	 //            "field6": ""
	 //        },
	 //        {
	 //            "firstname": "Samuel C.",
	 //            "lastname": "Okanume",
	 //            "email": "sammychrise@gmail.com",
	 //            "Website": "BVS JVC Services",
	 //            "field5": "CEO",
	 //            "field6": ""
	 //        }
	 //    ];

	    const data = require('./quickJson.json');

		const ebusameric = {
			access_token: "ya29.a0AfH6SMB4nrWb6WK1E_xmwejlQAwMfsbr7HaNb4lgpS88y04bJowfCGM8_hePJ02Vq3HgP1QR3OCNoUbqbp17r7js4a-NHmQCbmbayXueN7wXYkNf1qQ4At_X3jcJixn9_3OeoPJbQAxcSghDu5TXGd9VB3wdhlyiJxI",
			refresh_token: "1//03V4pbTpo7aDrCgYIARAAGAMSNwF-L9IrapBORTgSftg22R-itfaR0Gif93OQ9ePsGdb30M31ILs7vTjQ1stHeE2VOXg9Utmd2tE",
			scope: "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send",
			token_type: "Bearer",
			expiry_date: 1603850653056
		};

		const webbiztek1 = {"access_token":"ya29.A0AfH6SMDgU26_2vxIQX__SiYRaHEpGfSGfc6dGdFTUsP3pWdHzNd12D0X_X4C7kPBvMEOKdGi7mVVQklgRWEFpA8yO7eZM3wSj9KXUMZOgLXPz3vNFlUrd4NCbPurCsevO-wiCV9hOtlbNczWAjBGxpjQD2dm9QX8vxrUqI9bziE","refresh_token":"1//03G10rGL9mfk6CgYIARAAGAMSNwF-L9IrMg9OhmAtLzn9NtmkZX0b_paBT9jDc8ib4mkCW_T8oliZScBdA9zASaBYt3bvLfF80tk","scope":"https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly","token_type":"Bearer","expiry_date":1604571241996}
		const webbiztek2 = {"access_token":"ya29.A0AfH6SMB4N1P36bXedSEFFSTyLO-0NH7M_Uw-77d9RhzhzqYeQZbY-uKytCzmKrQtLEvGzALkZ1O5umjymnKY72sy2x-P_uvLHn3zIPDwL7_lpCzzcVFvZHqaDmGnk1DcppGbf2VcAs2c4Qs-q7UxubgDKk9V63UBaI_2mPzzC0w","refresh_token":"1//03dGowljQJqusCgYIARAAGAMSNwF-L9IrvOKtopxZ_ScDKrL1tz5TIMoxHwrs8W4ERl2DpsJ_pKY8ctyq47lf2P0tn51AAWQQCfs","scope":"https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify","token_type":"Bearer","expiry_date":1604570961778}
		const webbiztek3 = {"access_token":"ya29.A0AfH6SMDSEWgW-KLX3ExsNPfTRHy4oOqE0550k5d9HJsZF3xUE-0pQTzd8eqMKPo_gN3nZK7e-ADG7yv-i6SC62uMbKquCvybQ9DSb4QPM8XUUJ2_dGyo9JO38t_22-tWy-rKeWBTptAIhJADXpQ0VdxavVrOQ2KVqAj59wDWLLY","refresh_token":"1//03pW9832n9yjgCgYIARAAGAMSNgF-L9IrXHBWmzhzc1lP4lItxwl-U1yBuacDkcsoBhr4DQBdspUOhEO4bn6su0Kj6TznEfCw8g","scope":"https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify","token_type":"Bearer","expiry_date":1604568086911}


		Gmail.sendMails({ tokens: webbiztek1, data, subject, body }, (err, result) => { // send the first one...

			if (err) return res.json({ message: '!could not send'});
			return res.json({ message: 'Quick mail sent!' });
		});
	})









	// Admin ROUTES ,...............

	// app.post('/api/admin/register', user.register); 			// POST a new user...
	// app.post('/api/admin/login', user.login); 				// POST a old user...

	// app.get('/api/user/', user.allUsers); 					// GET all users...
	// app.get('/api/user/:id', user.oneUser); 				// GET a user...
	// app.put('/api/user/:id', user.update); 					// UPDATE a new user...

	// app.get('/api/:admin', admin.getOne); 				// GET a Admin...
	// app.put('/api/:admin', admin.update); 				// UPDATE an Admin...


	// app.get('/api/admin/import', emaillist.getAll); 						// GET all lists  used...
	// app.post('/api/admin/import', uploadCsv, emaillist.upload); 			// POST a list  used...
	// app.get('/api/admin/import/:id', emaillist.getOne); 					// GET a list
	// app.put('/api/admin/import/:id', uploadCsv, emaillist.updateOne); 	// UPDATE an email list
	// app.delete('/api/admin/import/:id', emaillist.deleteOne); 			// DELETE a list used...


	// app.post('/api/admin/message', message.create); 				// POST a message use...
	// app.get('/api/admin/message', message.getAll); 				// GET all messages use...
	// app.get('/api/admin/message/:id', message.getOne); 			// GET a message
	// app.put('/api/admin/message/:id', message.updateOne); 		// UPDATE a message
	// app.delete('/api/admin/message/:id', message.deleteOne);   	// DELETE a message use...


	// app.post('/api/admin/campaign', campaign.create);						// POST a campaign 
	// app.get('/api/admin/campaign', campaign.getAll); 						// GET all campaign
	// app.get('/api/admin/campaign/:id', campaign.getOne); 					// GET a campaign
	// // app.put('/api/campaign/:id', campaign.updateOne); 			// UPDATE a campaign
	// app.delete('/api/admin/campaign/:id', campaign.deleteOne);   			// DELETE a campaign


	// app.post('/api/admin/campaign/send', sendCampaign.send);		// SEND a campaign 
	// app.post('/api/admin/campaign/pause', googleVerify, sendCampaign.pause);	// PAUSED a campaign 
	// app.post('/api/admin/campaign/resume', googleVerify, sendCampaign.send);	// RESUME a campaign
	// app.post('/api/admin/campaign/cancel', googleVerify, sendCampaign.cancel);	// CANCELLED a campaign

	// app.post('/api/admin/campaign/sendfollowup', googleVerify, message.create, sendCampaign.send );	// SEND a campaign follow up

	// app.post('/api/admin/upload_image', uploadImage, image.upload);	// CANCELLED a campaign




	// AUTH ROUTES ............... 

	app.post('/auth/register', user.register); 			// POST a new user...
	app.post('/auth/login', user.login); 				// POST a old user...


	// USER
	
	//app.get('/api/user/', user.allUsers); 				// GET all users...
	app.get('/api/user/:id', passport.authenticate('jwt', { session: false }), user.getUser); // GET a user...
	app.put('/api/user/:id',  passport.authenticate('jwt', { session: false }), user.update); // UPDATE a new user...



	// USER APIs
	app.post('/api/importcsv', passport.authenticate('jwt', { session: false }), uploadCsv, userList.importCsv); 
	app.get('/api/import', passport.authenticate('jwt', { session: false }), userList.getAll); 						// GET all lists  used...
	app.post('/api/import', passport.authenticate('jwt', { session: false }), userList.importJson); 			// POST a list  used...
	app.get('/api/import/:id', passport.authenticate('jwt', { session: false }), userList.getOne); 					// GET a list
	app.put('/api/import/:id', passport.authenticate('jwt', { session: false }), uploadCsv, userList.updateOne); 	// UPDATE an email list
	app.delete('/api/import/', passport.authenticate('jwt', { session: false }), userList.deleteList); 			// DELETE a list used...
	app.post('/api/import/:id', passport.authenticate('jwt', { session: false }), userList.updateItems); 			// UPDATE items in a list



	app.post('/api/message', passport.authenticate('jwt', { session: false }), userMessage.create); 			// POST a message use...
	app.get('/api/message', passport.authenticate('jwt', { session: false }), userMessage.getAll); 				// GET all messages use...
	app.get('/api/message/:id', passport.authenticate('jwt', { session: false }), userMessage.getOne); 			// GET a message
	app.put('/api/message/:id', passport.authenticate('jwt', { session: false }), userMessage.updateOne); 		// UPDATE a message
	app.delete('/api/message/:id', passport.authenticate('jwt', { session: false }), userMessage.deleteList);   	// DELETE a message use...


	app.post('/api/campaign', passport.authenticate('jwt', { session: false }), userCampaign.create);						// POST a campaign 
	app.get('/api/campaign', passport.authenticate('jwt', { session: false }), userCampaign.getAll); 	// GET all campaign
	app.get('/api/campaign/:id', passport.authenticate('jwt', { session: false }), userCampaign.getOne); 					// GET a campaign
	// app.put('/api/campaign/:id', campaign.updateOne); 						// UPDATE a campaign
	app.delete('/api/campaign/:id', passport.authenticate('jwt', { session: false }), userCampaign.deleteList);   			// DELETE a campaign


	app.post('/api/campaign/send', passport.authenticate('jwt', { session: false }), userSendCampaign.send);						// SEND a campaign 
	app.post('/api/campaign/pause', passport.authenticate('jwt', { session: false }), googleVerify, userSendCampaign.pause);		// PAUSED a campaign 
	app.post('/api/campaign/resume', passport.authenticate('jwt', { session: false }), googleVerify, userSendCampaign.send);		// RESUME a campaign
	app.post('/api/campaign/cancel', passport.authenticate('jwt', { session: false }), googleVerify, userSendCampaign.cancel);		// CANCELLED a campaign

	app.post('/api/campaign/sendfollowup', passport.authenticate('jwt', { session: false }), googleVerify, userMessage.create, userSendCampaign.send );	// SEND a campaign follow up


	app.post('/api/upload_image', passport.authenticate('jwt', { session: false }), uploadImage, userImage.upload);	// CANCELLED a campaign





	// This part is just to send quick tokens......................................
	app.get('/api/quicktoken', user.quickAuth)
	app.get('/callback', generateQuickToken); // Collecting of quick token... 





	// app.get('/callback', passport.authenticate('jwt', { session: false }), generateGoogleToken); // Collecting of token... 





	app.get('/api/stream', (req, res) => {
		channel.subscribe(req, res);
	});

}
 
