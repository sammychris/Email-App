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
    bottom: 20,
    zIndex: 1100,
    boxShadow: '-11px 11px 20px 0px #0000001a',
  },
  header: {
    background: 'rgb(244, 246, 248)',
    padding: '20px 10px',
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

export default function Createmessage(props) {
  const classes = useStyles();
  const { FroalaEditor } = window;
  const { useState, useEffect } = React;

  const [body, setBody] = useState('');

  useEffect(() => {
    new FroalaEditor('#selector', {
      attribution: false,
      placeholder: 'enter body',
      imageUploadParams: { id: 'my_editor' },
      events: {
				contentChanged: function(){
          setBody( this.html.get())
				}
			}
    });
  })

  return (
    <div className={ classes.root } >
      <div className={classes.header}>New Message <CancelIcon className={classes.cancel} onClick={props.compose}/> </div>
      <div style={{ padding: '10px'}}>
        <TextField className={ classes.subject } id="outlined-basic" label="Suject" variant="outlined" />
      </div>
      <div id="selector" style={{ width: '100%', height: 370, overflowY: 'auto', padding: 10 }} ></div>
      <div className={ classes.footer }>
        <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save
        </Button>
      </div>
    </div>
  );
}
