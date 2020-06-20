const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const EmailListSchema = new mongoose.Schema({
	user: 		{ type: ObjectId, ref: 'User' },
	name:       { type: String, required: true },
	list:       { type: [], required: true },
	list_stack: { type: [], required: true }

});

module.exports = mongoose.model('EmailList', EmailListSchema);

