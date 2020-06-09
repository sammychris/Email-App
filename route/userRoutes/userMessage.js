const db = require('../../models');



function create(req, res, next){ // CREATE a message

	const { user } = req;
	const { subject, body, followup } = req.body;

	const newMessage = db.Message({ user: user.id, subject, body });

	req.message = newMessage; // store the message as a request for the next follow up campaign method...
		

	user.messageIds.push(newMessage.id); // push campaign id to user

	user.save() // save new user
		.then(() => {
			
			newMessage.save()
				.then((result) => {

					if (followup) return next(); // if it a follow up message? after creating, move to next method...

					res.json({ result }); // Message saved successfully!
				})
				.catch(err => res.status(401).json({ err })); 
		})
}


function getAll(req, res){ // GET all user messages
	const { user } = req;

	db.Message.find({ user: user.id }, '_id subject')
	 	.then(messages => res.json({ messages }))
	 	.catch(err => res.status(401).json({ err: 'Could not import!' }));
};



function getOne(req, res){ // GET a message
	const { user } = req;
	const { id } = req.params;
	db.Message.findOne({ _id: id, user: user.id }, 'subject body id')
		.then(message => res.json({ message }))
		.catch(err => res.status(401).json({ err: 'UnAuthorize!' }));
};



function updateOne(req, res){ // UPDATE a message
	const { user } = req;
	const { id } = req.params;
	const { subject, body } = req.body;

	db.Message.find({ _id: id, user: user.id })
		.then(message => {

			message.name = subject || message.subject;
			message.body = body || message.body;

			message.save()
				.then(() => res.json({ message: 'Updated Successfully!', success: true }));
		})
		.catch(err => res.status(401).json({ err: 'UnAuthorize!' }));
			
};



function deleteList(req, res){
	const { user } = req;
	const { ids } = req.body;

	db.Message.deleteMany({_id: { $in: ids }}, function(err) {
		if(err) return res.json(err);
		res.json({ message: 'Deleted Successfully!'});
	});

};


module.exports = { create, getAll, getOne, updateOne, deleteList };

