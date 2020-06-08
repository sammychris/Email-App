const db 			= require('../../models');
const SSEChannel 	= require('sse-pubsub');
const {Gmail}		= require('../../googleApi');
const channel 		= new SSEChannel();


let scheduler, start, continueOldReq; // Global Variables...


let errorM = true;




function send(req, res) {
	const { tokens } = req.user;

	const { time, daily, options,  campaignId, followup } = req.body;

	//const startTime = options === 'now'? 0: time; // current_time - start

	// const begin =  current_time - start_time;;;

	db.Campaign.findById(campaignId)
		.populate('listId')
		.populate('messageId')
		.then(campaign => {
			const EmailList = campaign.listId;
			const message   = campaign.messageId[ campaign.messageId.length - 1 ]; // send to the last/current message in the array...

			if (!continueOldReq) EmailList.list_stack = EmailList.list; // Don't create new stack list, if you want to continue sending old request...

			if (followup) followUpCampaign(campaign, req.message.id); // add follow up messages id to campaign messageId...

			const { subject, body } = message;
					
			let data = chunck(EmailList.list_stack, 1); // chuncking of data's per day

			const isValid = validateData(data, subject, body); // checking for data error...
			if (isValid.error) return res.json({ message: isValid.message }); 


			console.log('You request is in progress!')
			res.json({ message: 'You request is in progress' });


			start = setTimeout(() => { // SET TIMEOUT STARTS HERE>>>>:>>> start sending from by the time set...

				Gmail.sendMails({ tokens, data, subject, body }, (err, result) => { // send the first one...
					if (err) {
						console.log('could not send campaign')
						return channel.publish({ message: 'could not send!'}, 'e');
					}

					EmailList.save()
					.then(() => channel.publish({ message: `Completed Today's Message!`}, 'e'));

					if (EmailList.list_stack[0]) { // if after sending the first list, the list is not empty...

						scheduler = setInterval(() => { // sending from second, third and fourth... in 24 hours interval

							data = chunck(EmailList.list_stack, 1); // keep taking a particular part of the list...
							
							Gmail.sendMails({ tokens, data, subject, body }, (err, result) => {
								if (err) {
									clearInterval(scheduler);
									console.log('could not send campaign')
									return channel.publish({ message: 'could not send!'}, 'e');
								}
								else if (EmailList.list_stack[0]) { // as long is the list_stack in not empty...
									EmailList.save()
									.then(output => channel.publish({ message: `Completed Today's Message!`}, 'e'));	
								}
								else { // once the list stack is empty, this should be called once. email sent completed.
									clearInterval(scheduler);
									// const isLast = true;    		   // isLast set to "true" means one final campaign update...
									updateCampaign(campaign, 'completed'); // final campaign update...
									channel.publish({ message: `Completed Today's Message!`}, 'e');
								}
								
							});

						}, 1000); // 24 hours....
					}
					else { // This section updates changes in a campaign DB if only the campaign was sent once...
						// const isLast = true;    // isLast set to "true" means one final campaign update...
						updateCampaign(campaign, 'completed'); // final campaign update...
					}
				});
		}, 0); // start time startTime)
	})
}





function beta(req, res) {
	console.log('This is should something')
	const { user } = req;
	const { tokens } = user;

	const { time, daily, options,  campaignId, followup } = req.body;

	//const startTime = options === 'now'? 0: time; // current_time - start

	const start_time = 0;


	// const begin =  current_time - start_time;;;

	db.Campaign.findById(campaignId)
		// .populate('listId')
		// .populate('messageId')
		.then(campaign => {
			console.log(campaign, 'This is take')
			// console.log('still in pending')
			// updateCampaign(campaign, 'pending') // update campaign to pending...
	
			start = setTimeout(() => { // SET TIMEOUT STARTS HERE>>>>:>>> start sending from by the time set...

				// console.log('still in progress')
				// updateCampaign(campaign, 'in progress') // update campaign to inprogress...

				db.EmailList.findById(campaign.listId)
					.then((EmailList) => { // data list...

						if(!continueOldReq) EmailList.list_stack = EmailList.list; // Don't create new stack list, if you want to continue sending old request...

						if (followup) followUpCampaign(campaign, req.message.id); // add follow up messages id to campaign messageId...

						const newestMessage = campaign.messageId[0]; // The newest added message to the message list in case of follow up...

						db.Message.findById(newestMessage)
							.then((message) => { // message subject and body...
								console.log('This is message', message);

								const { subject, body } = message;
								
								let data = chunck(EmailList.list_stack, 1); // chuncking of datas per day

								Gmail.sendMails({ tokens, data, subject, body }, (err, result) => { // send the first one...
									if (err) {
										console.log('could not send campaign')
										return channel.publish({ message: 'could not send!'}, 'e');
									}

									EmailList.save()
									.then(() => channel.publish({ message: `Completed Today's Message!`}, 'e'));

									if (EmailList.list_stack[0]) { // if after sending the first list, the list is not empty...

										scheduler = setInterval(() => { // sending from second, third and fourth... in 24 hours interval

											data = chunck(EmailList.list_stack, 1); // keep taking a particular part of the list...
											
											Gmail.sendMails({ tokens, data, subject, body }, (err, result) => {
												if (err) {
													clearInterval(scheduler);
													console.log('could not send campaign')
													res.json({ message: 'could not send!' });
												}
												else if (EmailList.list_stack[0]) { // as long is the list_stack in not empty...
													EmailList.save()
													.then(output => channel.publish({ message: `Completed Today's Message!`}, 'e'));	
												}
												else { // once the list stack is empty, this should be called once. email sent completed.
													clearInterval(scheduler);
													// const isLast = true;    		   // isLast set to "true" means one final campaign update...
													updateCampaign(campaign, 'completed'); // final campaign update...
													channel.publish({ message: `Completed Today's Message!`}, 'e');
												}
												
											});

										}, 1000); // 24 hours....
									}
									else { // This section updates changes in a campaign DB if only the campaign was sent once...
										// const isLast = true;    // isLast set to "true" means one final campaign update...
										updateCampaign(campaign, 'completed'); // final campaign update...
									}
								});


								// if (EmailList.list_stack[0]) { // if after sending the first list, the list is not empty...
								// 	console.log('once this is cool ')
								// 	scheduler = setInterval(() => { // sending from second, third and fourth... in 24 hours interval

								// 		data = chunck(EmailList.list_stack, 1); // keep taking a particular part of the list...
										

								// 		Gmail.sendMails({ data, subject, body }, (err, result) => {
								// 			console.log('to check the right this')

								// 			if (err) {
								// 				clearInterval(scheduler);
								// 				res.json({ message: 'could not send!' });
								// 			}
								// 			else if (EmailList.list_stack[0]) { // as long is the list_stack in not empty...

								// 				EmailList.save()
								// 				.then(output => channel.publish({ message: `Completed Today's Message!`}, 'e'));
												
								// 			}
								// 			else { // once the list stack is empty, this should be called once. email sent completed.
								// 				console.log('final Last');
								// 				const isLast = true;    		   // isLast set to "true" means one final campaign update...
								// 				updateCampaign(campaign, 'completed'); // final campaign update...

								// 				clearInterval(scheduler);
								// 				channel.publish({ message: `Completed Today's Message!`}, 'e');
								// 			}
											
								// 		});

								// 	}, 10000); // 24 hours....
								// }
								// else { // This section updates changes in a campaign DB if only the campaign was sent once...
								// 	console.log('first last');
								// 	const isLast = true;    // isLast set to "true" means one final campaign update...
								// 	updateCampaign(campaign, 'completed'); // final campaign update...
								// }

							})
							.catch();
					})
				.catch();
		}, 0); // start time startTime)
	})

	res.json({ message: 'Emails has start sending!!!' });  // start our requests
}


function pause(req, res) {

	clearInterval(start); // clear start
	clearInterval(scheduler); // clear scheduler

	continueOldReq = true; // if paused, old request can be continued...

	console.log('Running campaign is paused!');
	return res.json({ message: 'Running campaign is paused!'});
}


function cancel(req, res) {

	clearInterval(start); // clear start
	clearInterval(scheduler); // clear scheduler

	continueOldReq = false; // if cancelled, nothing like old request...

	console.log('Your campaignd is cancelled!');
	return res.json({ message: 'Your campaignd is cancelled!'});
}


	// if(!data || !subject || !body || !startTime || !now || !daily){
	// 	return res.json({ message: 'Invalid Data' });
	// }
	// // todaysEmails = EmailListTable - numberPerDay;

	// setTimeout(() => {}, 'begin') // time to start sending...

	// setInterval(() => {
	// 	// todaysEmails
	// 	const scheduler = sendMails({ 'todaysEmails', subject, body}, (err, result) => {
	// 		if (err) { 
	// 			clearInterval(scheduler);
	// 			return res.json({ message: 'could not send!'});	
	// 		}
	// 		return res.json({ message: 'Emails Sent Successfully!'});
	// 	});
	// }, '24hours') // sends the emails 24hours later...






	// app.post('/api/sendmail', (req, res) => {
	// 	//////  Data, Subject, Body,
	// 	const { data, subject, body, startTime, now, daily } = req.body;

	// 	if(!data || !subject || !body || !startTime || !now || !daily)
	// 		return res.json({ message: 'Invalid Data' });

	// 	const mailsPerDay = divideArr(data, Number(daily)); // number of mails per day: depends on the user..
	// 	const waitingMails = [];
	// 	const myId = Math.round(Math.random() * 9999999) + 1;
	// 	timeStocker[myId] = []; // to keep track of timer...
	// 	let begin = Number(startTime);

	// 	if(now) begin = 100;

	// 	const startTimeout = setTimeout( () => {
	// 		let trackItem = 0; // current item 

	// 		sendMails({ data: mailsPerDay[trackItem], subject, body}, (err, result) => {
	// 			if (err) return res.json({ message: '!could not send'});
	// 			waitingMails[trackItem].status = 'sent';
	// 			return channel.publish({ message: `Completed Today's Message` }, 'e');
	// 		});

	// 		if (mailsPerDay.length > 1){
	// 			const scheduler = setInterval( () => {
	// 				trackItem++;
	// 				sendMails({ data: mailsPerDay[trackItem], subject, body}, (err, result) => {
	// 					if (err) { 
	// 						clearInterval(scheduler);
	// 						return channel.publish({ message: '!could not send'}, 'e');	
	// 					}
	// 					if(!mailsPerDay[trackItem + 1]){ // if no next item...
	// 						clearInterval(scheduler); 
	// 						waitingMails[trackItem].status = 'sent';
	// 						return channel.publish({ message: `Sent All Messages!`}, 'e');
	// 					}
	// 					waitingMails[trackItem].status = 'sent';
	// 					return channel.publish({ message: `Completed Today's Message!`}, 'e');
	// 				});
	// 			}, 50000)//24 * (60 * (60 * 1000)));  // 25hrs 

	// 			timeStocker[myId].push(scheduler); //....
	// 		}

	// 	}, begin ); // Time the test should start...

	// 	timeStocker[myId].push(startTimeout); //.....

	// 	for(let i = 0; i < mailsPerDay.length; i++) {
	// 		const date = new Date();
	// 		date.setDate(date.getDate()+i);
	// 		waitingMails.push({ 
	// 			date: date.toDateString(),
	// 			number: mailsPerDay[i].length,
	// 			status: 'waiting',
	// 			time: date.getHours() +":"+ date.getMinutes(),
	// 		});
	// 	}

	// 	allRequest.push({ request: waitingMails, id: myId });
	// 	return res.json({ message: 'Your Messages request has begin!' });
	// });

	// app.get('/api/sendmail', (req, res) => {
	// 	console.log(timeStocker);
	// 	res.status(200).json(allRequest);
	// });




function chunck(list, daily){ // slicing the list
    return list.splice(0, daily);
}


function updateCampaign(campaign, message) {
	// if (isLast){
	// 	campaign.schedule.status = message;
	// 	campaign.messagesTimeDelivered.push(new Date().toDateString()); // storing messages time in an array...
	// 	campaign.save().then(result => result); // updated and saved
	// }else {
	campaign.schedule.status = message;
	campaign.save().then(result => result);  // updated and saved
	//}
}

function followUpCampaign(campaign, messageId){
	campaign.messageId.push(messageId);
	campaign.messagesTimeDelivered.push(new Date().toDateString()); // storing messages time in an array...
	campaign.save().then(result => result);  // updated and saved
}



function validateData(data, subject, body){
    const dataVal = {};
    let emailKey;
    let nextItem = 1; 

    for(let key in data[0]) {
      let newKey = key.replace(/\s/g, '').toLowerCase();
      if(/email/.test(newKey)) emailKey = newKey;
      dataVal[newKey] = key;
    }

    for(let person of data) { // loop through each users
		let email = person[dataVal[emailKey]];
		let newBody = body;
		let isLastItem = !data[nextItem]; // if no next item
		for(let key in dataVal){ // loop through the body to find the variables
			const find = new RegExp(`{${key}}`,'gi');
			newBody = newBody.replace(find, person[dataVal[key]]);  // find and replace the variables
		}
		if(!email) {
			console.log('email is not available/correct!');
			return { error: true, message: 'email is not available/correct!'};
		}
		if(!subject){
			console.log('subject is not available/correct!');
			return { error: true, message: 'subject is not available/correct!'};
		}
		if(!newBody) {
			console.log('body is not available/correct!');
			return { error: true, message: 'body is not available/correct!'};
		}
		nextItem++;
    }
    return { error: false };
}










module.exports = { send, pause, cancel };



