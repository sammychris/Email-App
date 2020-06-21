const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const CampaignSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: 'User' },
	name: { type: String, required: true },
	listId: { type: ObjectId, ref: 'EmailList' },
	messageId: [ { type: ObjectId, ref: 'Message' } ],
	messagesTimeDelivered: [ { type: Date, default: 'not yet' } ],
	// actions: {
	// 	start_time: { type: Date, default: 'currenttime' },
	// 	date : 		{ type: Date, default: Date.now() },
	// 	daily: 		{ type: Number, required: true },
	// 	status: 	{ type: String, default: 'progressing' },
	// 	due_countdown: Number
	// },
	// records: {
	// 	date: { type: Date, default: Date.now() },
	// 	date_completed: Date,
	// 	days: Number,
	// 	emails_Sent_Daily: Number,
	// 	status: String,
	// },
	schedule: { 													// start_time for sending, 
		//start_time, daily, date_created, date_completed, days 	// daily means mails sent perday
		time    	  : { type: String, default: '' },
		daily		  : { type: Number, default: 0 },
		date_created  : { type: Date, default: Date.now() },
		date_completed: { type: String, default: '' },
		status		  : { type: String, default: 'pending' },
		days     	  : { type: Number, default: 0 },
	}
});


module.exports = mongoose.model('Campaign', CampaignSchema);
