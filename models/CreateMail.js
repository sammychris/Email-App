const {google} = require('googleapis');
const mailComposer = require('nodemailer/lib/mail-composer');
    
class CreateMail{
    
    constructor(auth, to, sub, body, sender = 'Webbiz Technologies', task = 'mail', attachmentSrc = []){
        this.me = 'me';
        this.sender = sender;
        this.task = task;
        this.auth = auth;
        this.to = to;
        this.sub = sub;
        this.body = body;
        this.gmail = google.gmail({version: 'v1', auth});
        this.attachment = attachmentSrc;
    }

    makeBody(callback, isLastItem){
        var arr = [];
        for (var i = 0; i < this.attachment.length; i++) {
            arr[i] = {
                path: this.attachment[i],
                encoding: 'base64'
            }
        }
        let mail;
        //Mail Body is created.
        if (this.attachment.length){
            mail = new mailComposer({
                from:`"${this.sender}"  <me>`, 
                to: this.to,
                html: this.body,
                subject: this.sub,
                textEncoding: "base64",
                attachments: arr
            }); 
        }
        else {
            mail = new mailComposer({
                from:`"${this.sender}"  <me>`, 
                to: this.to,
                html: this.body,
                subject: this.sub,
                textEncoding: "base64"
            });
        }
        
        //Compiles and encodes the mail.
        mail.compile().build((err, msg) => {
            if (err){
                console.log('Error compiling email ' + err);
                return callback(true);
            } 
        
            const encodedMessage = Buffer.from(msg)
              .toString('base64')
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=+$/, '');
            
            if (this.task === 'mail'){
                this.sendMail(encodedMessage, callback, isLastItem);
            }
            else {
                this.saveDraft(encodedMessage, callback);
            }
        });
    }

    //Send the message to specified receiver.
    sendMail(encodedMessage, callback, isLastItem){
        
        // let emailLines = [];

        // emailLines.push("From: \"Some Name Here\" <webbiztek.m@gmail.com>");
        // emailLines.push('To: ebusameric@gmail.com');
        // emailLines.push('Content-type: text/html;charset=iso-8859-1');
        // emailLines.push('MIME-Version: 1.0');
        // emailLines.push('Subject: this would be the subject');
        // emailLines.push('');
        // emailLines.push('And this would be the content.<br/>');
        // emailLines.push('The body is in HTML so <b>we could even use bold</b>');

        // const email = emailLines.join('\r\n').trim();

        // let base64EncodedEmail = new Buffer.from(email).toString('base64');
        // base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');


        this.gmail.users.messages.send({
            userId: this.me,
            resource: {
                raw: encodedMessage,
            }
        }, (err, result) => {
            if(err){
                console.log('NODEMAILER - The API returned an error: ' + err);
                return callback(true);
            }       
            console.log("NODEMAILER - Sending email reply from server:", result.data);
            if (isLastItem) callback(false, result.data);
        });
    }

    //Saves the draft.
    saveDraft(encodedMessage, callback){
        this.gmail.users.drafts.create({
            'userId': this.me,
            'resource': {
                 'message': {
                    'raw': encodedMessage
                }
            }
        }, (err, result) => {
            if(err) {
                return callback(true);
            }
            callback(false, result);
        })
    }

    //Deletes the draft.
    deleteDraft(id){
        this.attachment.gmail.users.drafts.delete({
            id: id,
            userId: this.me 
        });
    }

    //Lists all drafts.
    listAllDrafts(){
        this.gmail.users.drafts.list({
            userId: this.me
            }, (err, res) => {
                if(err){
                        console.log(err);
                }
            else{
                console.log(res.data);
            }
        });
    }
}

module.exports = CreateMail;
