const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const MessageSchema = new mongoose.Schema({
	user    : { type: ObjectId, ref: 'User' },
	subject : { type: String, required: true },
	body	: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);
