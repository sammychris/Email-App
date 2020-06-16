const db = require('../models');

function upload(req, res) {
    const { file } = req;
    console.log(file);
    res.json({ link: '/uploads/'+ file.filename });
}

module.exports = { upload };
