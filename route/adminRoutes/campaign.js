const db = require('../models');



function create(req, res){ // CREATE a Campaign
	const { user, name, time, daily, listId, messageId, listLength, options } = req.body;

	const days = Math.ceil(listLength/Number(daily)); // "listLength" divided by emailsPerDay "daily" equals to totalNumberOfDays to complete...
	
	const date = new Date();					  // storing date to a variable date...
	date.setDate(days); 		 // setting date by the number of days...
	const date_completed = date.toDateString(); // converting the date to a string
	

	const newCampaign = db.Campaign({
		user,
		name,
		listId,
		messageId,
		schedule: { 										// start_time for sending, 
			time, daily, date_completed, days 				// daily means mails sent perday
		}										
	});														// "date_completed" days number of days it took to complete...


	//req.campaign = newCampaign; // storing campaign object to be used in the next campaign.send function...

	db.User.findById(user) // save campaign in message ids...
		.then(newUser => {

			newUser.campaignIds.push(newCampaign.id); // push campaign id to user

			newUser.save() // save new user
				.then(() => {

					newCampaign.save()
						.then((result) => res.json({ result }))
						.catch(err => res.status(401).json({ err })); 

				})
		});

}


function getAll(req, res){ // GET all Campaigns
	console.log('what is this')
	db.Campaign.find({})
		.then(result => res.json({result}))
		.catch(err => res.status(401).json({ err }));
};


function getOne(req, res){ // GET a Campaign
	const { id } = req.params;
	db.Campaign.findById(id)
		.then(result => res.json({ result }))
		.catch(err => res.status(401).json({ err }));
};


// function updateOne(req, res){ // UPDATE a Campaign
// 	const { name, start_time, daily } = req.body;
// 	const { listId, messageId } = req.params;

// 	db.Campaign.findById(id)
// 		.then(result => {

// 			result.name 				= name       || result.name;
// 			result.listId				= listId     || result.listId;
// 			result.messageId			= messageId  || result.messageId;
// 			result.actions.start_time	= start_time || result.actions.start_time
// 			result.actions.daily 		= daily		 || result.actions.daily

// 			result.records.date                = date                || result.records.date;
// 			result.records.days_to_complete    = days_to_complete    || result.records.days_to_complete;
// 			result.records.emails_Sent_Per_Day = emails_Sent_Per_Day || result.records.emails_Sent_Per_Day;
// 			result.records.status			   = status				 || result.records.status;
// 			result.records.due_countdown	   = due_countdown       || result.records.due_countdown;
// 			result.records.date_completed	   = date_completed      || result.records.date_completed;

// 			result.save()
// 				.then(() => res.json({ message: 'Updated Successfully!', success: true }));
// 		})
// 		.catch(err => res.status(401).json({ message: 'Id doest not exist!' }));
			
// };



function deleteOne(req, res){ /// DELETE a Campaign
	const { id } = req.params;
	db.Campaign.findById(id)
		.then(result => {

			result.deleteOne((er) => {
				if(er) return res.send(er);
				return res.json({ message: 'Deleted Successfully!'})
			});

		})
		.catch(err => res.status(401).json({ err }));
};

module.exports = { create, getAll, getOne, /*updateOne*/ deleteOne };

