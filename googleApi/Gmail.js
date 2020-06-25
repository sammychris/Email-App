const {google}     = require('googleapis');
const oauth2Client = require('./oauth2Client');
const db           = require('../models');



function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}



function checkMails(callback, tokens){
    oauth2Client.setCredentials(tokens); // auth

    var obj = new db.CheckMail(oauth2Client);

    obj.checkForMediumMail();
}



function sendMails(obj, callback){
	let { tokens, data, subject, body, sender } = obj;

    const dataVal = {};
    let emailKey;
    let nextItem = 1;
    let counter = 0;


    oauth2Client.setCredentials(tokens); // auth

    // for(let key in data[0]) {
    //   let newKey = key.replace(/\s/g, '').toLowerCase();
    //   if(/email/.test(newKey)) emailKey = newKey;
    //   dataVal[newKey] = key;
    // }

    // for(let person of data) { // loop through each users
  		// let email = person[dataVal[emailKey]];
  		// let newBody = body;
  		// let isLastItem = !data[nextItem]; // if no next item
  		// for(let key in dataVal){ // loop through the body to find the variables
  		// 	const find = new RegExp(`{${key}}`,'gi');
  		// 	newBody = newBody.replace(find, person[dataVal[key]]);  // find and replace the variables
  		// }
  		// ///////////////////////// (Auth, Email, Subject, Body, Mail, attachmentSrc)...
  		// const mailObj = new db.CreateMail(oauth2Client, email, subject, newBody, sender);
  		// // 'mail' is the task, if not passed it will save the message as draft.
  		// // attachmentSrc array is optional.

  		// mailObj.makeBody(callback, isLastItem);
  		// nextItem++;
    // }

    // for(let eachPerson of data) { // loop through each users
    //   let email = eachPerson['email'];
    //   let isLastItem = !data[nextItem]; // if no next item

    //   subject = subject.replace(/{\w+}/gi, a => eachPerson[a.match('(?<={).*?(?=})')] || a );
    //   body = body.replace(/{\w+}/gi, a => eachPerson[a.match('(?<={).*?(?=})')] || a );

    //   ///////////////////////// (Auth, Email, Subject, Body, Mail, attachmentSrc)...
    //   const mailObj = new db.CreateMail(oauth2Client, email, subject, body, sender);
    //   // 'mail' is the task, if not passed it will save the message as draft.
    //   // attachmentSrc array is optional.

    //   mailObj.makeBody(callback, isLastItem);
    //   nextItem++;
    // }


    let sending = setInterval(function () {
       let eachPerson = data[counter];

      if(!data[counter]) {
        return clearInterval(sending);
      }

     
      let email = eachPerson['email'];
      let isLastItem = !data[nextItem]; // if no next item

      const newSubject = subject.replace(/{\w+}/gi, a => eachPerson[a.match('(?<={).*?(?=})')] || a );
      const newBody = body.replace(/{\w+}/gi, a => eachPerson[a.match('(?<={).*?(?=})')] || a );


      ///////////////////////// (Auth, Email, Subject, Body, Mail, attachmentSrc)...
      const mailObj = new db.CreateMail(oauth2Client, email, newSubject, newBody, sender);
      // 'mail' is the task, if not passed it will save the message as draft.
      // attachmentSrc array is optional.

      mailObj.makeBody(callback, isLastItem);
      nextItem++;
      counter++;

    }, 5000);

}


function sendOneMail(object, callback){
	const { tokens, data: email, subject, body, sender } = object;

	oauth2Client.setCredentials(tokens);

	const obj = new db.CreateMail(oauth2Client, email, subject, body, sender);
	let isLastItem = true;
	obj.makeBody(callback, isLastItem);
}

module.exports = { sendMails, checkMails, sendOneMail };

