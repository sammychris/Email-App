const mongoose = require('mongoose');

const testoption = new mongoose.Schema({
	list: []
});

module.exports = mongoose.model('testoption', testoption);

