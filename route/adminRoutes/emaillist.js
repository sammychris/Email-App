const csv 			= require('csvtojson');
const db 			= require('../models');
const csvFilePath 	= __dirname + "/../uploads/contacts.csv";



function getAll(req, res){ // get all uploaded list
	db.EmailList.find({})
		.then(result => res.json({result}))
		.catch(err => res.status(401).json({ err }));
}



function upload(req, res){
	const { user, name } = req.body;

    csv()
	.fromFile(csvFilePath)
		.then((jsonObj)=> {

			const emailList = new db.EmailList({ // Storing the imported EMAILS to the Database...
				user, name, list: jsonObj, list_stack: jsonObj
			});

			db.User.findById(user) // save campaign in message ids...
				.then(newUser => {

					newUser.listIds.push(emailList.id); // push campaign id to user

					newUser.save() // save new user
						.then(() => {
							
							emailList.save()
								.then(() => res.json({ jsonObj })) // sending the json object as the result...
								.catch(err => res.status(401).json({ err }));   
						})
				});


		}).catch(err => res.status(401).json({ err })); 
}



function getOne(req, res){
	const { id } = req.params;
	db.EmailList.findById(id)
		.then(result => res.json({ result }))
		.catch(err => res.status(401).json({ err }));
};



function updateOne(req, res){
	const { id } = req.params;
	const { name } = req.body;
	csv()
	.fromFile(csvFilePath)
		.then((jsonObj)=> {

			db.EmailList.findById(id)
				.then(result => {
					result.name = name || result.name;
					const updateList = [...result.list];

					for(let i = 0; i < result.list.length; i++) { // check before updating a list
						for(let key in result.list[i]) {
							let newValue = jsonObj[i][key];
							let oldValue = result.list[i][key];
							if(newValue !== oldValue) updateList.push(jsonObj[i]); 
						}
					}

					result.list = updateList; // update the list
					result.save()
						.then(() => res.json({ message: 'Updated Successfully!', success: true }));
				})
				.catch(err => res.status(401).json({ message: 'Id doest not exist!' }));
		});
};



function deleteOne(req, res){
	const { id } = req.params;
	db.EmailList.findById(id)
		.then(result => {
			result.deleteOne((er, result) => {
				if(er) return res.send(er);
				return res.json({ result })
			})
		})
		.catch(err => res.status(401).json({ err }));
};



module.exports = { getAll, upload, getOne, updateOne, deleteOne };

