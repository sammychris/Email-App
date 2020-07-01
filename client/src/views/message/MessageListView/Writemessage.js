import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import { X as CancelIcon} from 'react-feather';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    border: '1px solid rgba(224, 224, 224, 1)',
    width: 800,
    position: 'fixed',
    right: 20,
    bottom: 10,
    zIndex: 1100,
    boxShadow: '-11px 11px 20px 0px #0000001a',
  },
  header: {
    background: 'rgb(244, 246, 248)',
    padding: '10px',
    fontSize: '16px',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: `500`,
    color: '#263238',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subject: {
    fontSize: 27,
    width: '100%',
  },
  personalize: {
    width: '70%',
    fontSize: 12,
    display: 'flex',
    justifyContent: 'space-around',
    padding: '5px 0 0 0',
    margin: 'auto',
  },
  variable: {
    background: '#10ff00',
    padding: '2px 5px',
  },
  button: {
    margin: theme.spacing(1),
  },
  footer: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
  cancel: {
    cursor: 'pointer'
  }
}));

export default function Writemessage(props) {
  const classes = useStyles();
  const { FroalaEditor } = window;
  const { useState, useEffect } = React;

  const storedMessage = JSON.parse(localStorage.getItem('message')); // use the previous saved message...
  const prevMessage = storedMessage || { 'subject': '', 'body': '' };

  let subject   = prevMessage['subject'];
  let body      = prevMessage['body'];


  const [state, setState] = useState({
    message: '', completed: '', error: false, popup: false
  });


  useEffect(() => {
    const editor = new FroalaEditor('#selector', {
      attribution: false,
      placeholder: 'enter body',

       // Set the image upload parameter. req.file.file
      imageUploadParam: 'imgfile',

      // Set the image upload URL API.
      imageUploadURL: '/api/upload_image',

      // Additional upload params.
      imageUploadParams: {id: 'my_editor'},

      // Set request type.
      imageUploadMethod: 'POST',

       // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],


      // Set max image size to 5MB.
      imageMaxSize: 5 * 1024 * 1024,
      events: {
        'image.beforeUpload': function (images) {
          console.log(images)
          // Return false if you want to stop the image upload.
        },
        'image.uploaded': function (response) {
          console.log(response)
          // Image was uploaded to the server.
        },
        'image.inserted': function ($img, response) {
          console.log($img, response)
          // Image was inserted in the editor.
        },
        'image.replaced': function ($img, response) {
          console.log($img, response);
          // Image was replaced in the editor.
        },
        'imageEditButtons': ['imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove'],
				'contentChanged': function(){
          body = this.html.get();

          console.log('what is happingss')
          localStorage.setItem('message', JSON.stringify({ subject, body })); // store in localstorage incase of coincidence...
				}
			}
    });
  })


  function handleSubject(e) {
    subject = e.target.value;
    localStorage.setItem('message', JSON.stringify({ subject, body })); // store in localstorage...
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(subject, body);

    if(!subject.length) {
      alert('message subject should not be empty')
      setState({ message: `Message subject should not be empty!`, error: true });
    }
    else if (!body.length) {
      alert('message body should not be empty')
      setState({ message: `Message body should not be empty!`, error: true });
    }
    else {
      fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, body }),
      })
      .then(res => res.json())
        .then(res => {
          const { err, result } = res;
          if(err) {
            console.log(err);
            return setState({ message: `Couldn't Create!`, error: true });
          }
          console.log(result);
          setState({ ...state, message:'Message Created Successfully!' });
          return localStorage.removeItem('message');
        });
    }
  }


  return (
    <form className={ classes.root } onSubmit={handleSubmit}>
      <div className={classes.header}>New Message <CancelIcon className={classes.cancel} onClick={props.compose}/> </div>
      <div className={ classes.personalize }>
        For personalize variables use <em>{'{firstname}'}</em> for <span className={classes.variable}>First Name</span> or <em>{'{lastname}'}</em> for <span className={classes.variable}>Last Name</span>
      </div>
      <div style={{ padding: '10px'}}>
        <TextField
          required
          className={ classes.subject }
          defaultValue={ subject }
          id="outlined-basic"
          label="Subject"
          variant="outlined"
          onChange={ handleSubject }
        />
      </div>
      <div style={{ width: '100%', height: 370, overflowY: 'auto', padding: '0 10px', zIndex: 2000 }} >
        <textarea required id="selector" defaultValue={ body }  style={{ zIndex: 2000 }}/>
      </div>
      <div className={ classes.footer }>
        <Button
            type="submit"
            variant="outlined"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save
        </Button>
      </div>
    </form>
  );
}
