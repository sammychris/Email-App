const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	lastname:  { type: String, required: true },
	email :    { type: String, required: true },
	password:  { type: String, required: true },
	listIds:   [ { type: ObjectId, ref: 'EmailList' } ],
	messageIds:  [ { type: ObjectId, ref: 'Message' } ],
	campaignIds: [ { type: ObjectId, ref: 'Campaign' } ],
	date_joined: { type: Date, default: Date.now() },
	tokens: Object
});


module.exports = mongoose.model('User', UserSchema);
