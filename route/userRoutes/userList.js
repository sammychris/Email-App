const csv 			= require('csvtojson');
const db 			= require('../../models');
const csvFilePath 	= __dirname + "/../../uploads/contacts.csv";



function importCsv(req, res){

    csv()
	.fromFile(csvFilePath)
		.then(jsonObj => res.json({ data: jsonObj }))
		.catch(err => res.status(401).json({ err: 'Could not import!' }));
}



function importJson(req, res){
	const { user } = req;
	const { name, data } = req.body;

	const jsonObj = data.map((item, index) => ({ ...item, id: index })); // Creating IDs for our list items

	const emailList = new db.EmailList({ // Storing the imported EMAILS to the Database...
		user: user.id, name, list: jsonObj, list_stack: jsonObj
	});

	user.listIds.push(emailList.id); // push list campaign id to user

	user.save() // save new user
		.then(() => {
			
			emailList.save()
				.then(() => res.json({ message: 'Data Successfully Updated!' })) // sending the json object as the result...
				.catch(err => res.status(401).json({ err }));

		})
}


function getAll(req, res){ // get all uploaded list
	const { user} = req;
	 db.EmailList.find({ user: user.id }, '_id name')
	 	.then(lists => res.json({ lists }))
	 	.catch(err => res.status(401).json({ err: 'Could not import!' }));
}



function getOne(req, res){
	const { user } = req;
	const { id } = req.params;
	db.EmailList.findOne({ _id: id, user: user.id }, 'list name id')
		.then(lists =>  res.json({ lists }))
		.catch(err => res.status(401).json({ err }));
};



function updateOne(req, res){
	const { user } = req;
	const { id } = req.params;
	const { name } = req.body;
	csv()
	.fromFile(csvFilePath)
		.then((jsonObj)=> {

			db.EmailList.findById(id)
				.then(result => {
					const userId = String(result.user);
					if(userId !== user.id) return res.status(404).json({ err: 'user not found!'});

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
				.catch(err => res.status(401).json({ err }));
		});
};



function deleteList(req, res){
	const { user } = req;
	const { ids } = req.body;

	db.EmailList.deleteMany({_id: { $in: ids }}, function(err) {
		if(err) return res.json(err);
		res.json({ message: 'Deleted Successfully!'});
	});

};



function updateItems(req, res){
	const { user } = req;
	const { id } = req.params;
	const { data } = req.body;
	
	const newData = data.map(item => {
		delete item['tableData'];
		return item;
	})


	db.EmailList.findOne({ _id: id, user: user.id }, 'list')
		.then(result => {

			result.list = newData;

			result.save()
				.then(() => res.json({ result }));

		})
		.catch(err => res.status(401).json({ err }));

};



module.exports = { getAll, importJson, importCsv, getOne, updateOne, deleteList, updateItems };

