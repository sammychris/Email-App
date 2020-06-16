const db = require('../models');



function create(req, res, next){ // CREATE a message

	const { user, subject, body, followup } = req.body;

	const newMessage = db.Message({ user, subject, body });

	req.message = newMessage; // store the message as a request for the next follow up campaign method...
		
	db.User.findById(user) // save campaign in message ids...
		.then(newUser => {

			newUser.messageIds.push(newMessage.id); // push campaign id to user

			newUser.save() // save new user
				.then(() => {
					
						newMessage.save()
							.then((result) => {

								if (followup) return next(); // if it a follow up message? after creating, move to next method...

								res.json({ result }); // Message saved successfully!
							})
							.catch(err => res.status(401).json({ err })); 

				})
		});
}


function getAll(req, res){ // GET all messages
	db.Message.find({})
		.then(result => res.json({result}))
		.catch(err => res.status(401).json({ err }));
};



function getOne(req, res){ // GET a message
	const { id } = req.params;
	db.Message.findById(id)
		.then(result => res.json({ result }))
		.catch(err => res.status(401).json({ err }));
};



function updateOne(req, res){ // UPDATE a message
	const { id } = req.params;
	const { subject, body } = req.body;

	db.Message.findById(id)
		.then(result => {

			result.name = subject || result.subject;
			result.body = body || result.body;

			result.save()
				.then(() => res.json({ message: 'Updated Successfully!', success: true }));
		})
		.catch(err => res.status(401).json({ message: 'Id doest not exist!' }));
			
};



function deleteOne(req, res){ /// DELETE a message
	const { id } = req.params;
	db.Message.findById(id)
		.then(result => {

			result.deleteOne((er, result) => {
				if(er) return res.send(er);
				return res.json({ result });
			});

		})
		.catch(err => res.status(401).json({ err }));
};

module.exports = { create, getAll, getOne, updateOne, deleteOne };

