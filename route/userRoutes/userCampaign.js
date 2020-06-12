const db = require('../../models');



function create(req, res){ // CREATE a Campaign...
	const { user } = req;
	const { campaignName, /*time, daily, listLength,*/ listId, messageId, options } = req.body;

	// const days = Math.ceil(listLength/Number(daily)); // "listLength" divided by emailsPerDay "daily" equals to totalNumberOfDays to complete...
	
	// const date = new Date();					  // storing date to a variable date...
	// date.setDate(days); 		 // setting date by the number of days...
	// const date_completed = date.toDateString(); // converting the date to a string
	

	const newCampaign = db.Campaign({
		user: user.id,
		name: campaignName,
		listId,
		messageId,
		// schedule: { 										// start_time for sending, 
		// 	time, daily, date_completed, days 				// daily means mails sent perday
		// }										
	});														// "date_completed" days number of days it took to complete...


	//req.campaign = newCampaign; // storing campaign object to be used in the next campaign.send function...


	//user.campaignIds.push(newCampaign.id); // push campaign id to user

	// user.save() // save new user
	// 	.then(() => {
			newCampaign.save()
				.then((result) => res.json({ result }))
				.catch(err => res.status(401).json({ err })); 

		//})
}


function getAll(req, res){ // GET all user Campaigns
	const { user } = req;

	db.Campaign.find({ user: user.id }, '_id name')
	 	.then(campaigns => res.json({ campaigns }))
	 	.catch(err => res.status(401).json({ err: 'Could not import!' }));
};



function getOne(req, res){ // GET a user Campaign
	const { user } = req;
	const { id } = req.params;
	db.Campaign.findOne({ _id: id, user: user.id }, '_id name listId messageId schedule')
		.then(campaign => res.json({ campaign }))
		.catch(err => res.status(401).json({ err: 'UnAuthorize!' }));
};


function deleteList(req, res){ // Delete a Campaign
	const { user } = req;
	const { ids } = req.body;

	db.Campaign.deleteMany({_id: { $in: ids }}, function(err) {
		if(err) return res.json(err);
		res.json({ message: 'Deleted Successfully!'});
	});

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



module.exports = { create, getAll, getOne, /*updateOne*/ deleteList };

