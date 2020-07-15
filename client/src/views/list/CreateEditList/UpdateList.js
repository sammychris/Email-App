import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { X as CancelIcon} from 'react-feather';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    border: '1px solid rgba(224, 224, 224, 1)',
    width: 600,
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
  container: {
    textAlign: 'center',
    padding: '40px 0 60px 0',
    fontFamily: 'Roboto',
    color: '#4e5050',
  },
  fileInput: {
    backgroundColor: '#3f51b530',
    fontSize: 18,
    border: '1px solid #e0e0e0',
    marginTop: 10,
  },
  button: {
    margin: theme.spacing(1),
  },
  footer: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
  cancel: {
    cursor: 'pointer',
    '&:hover': {
      background: "#b1b1b1",
      color: '#e6e6e6',
    },
  }
}));

export default function UpdateList(props) {
  const classes = useStyles();
  const { useState, useEffect } = React;

  return (
    <div className={ classes.root } >
      <div className={classes.header}>Update List<CancelIcon className={classes.cancel} onClick={props.update}/> </div>
      <div style={{ padding: '10px'}}>
        <TextField className={ classes.subject } id="outlined-basic" label="(New or previous List name)" variant="outlined" />
      </div>
      <div className={classes.container}>
        <h4>Optional! Merge a new file</h4>
        <input type="file" className={classes.fileInput}/>
      </div>
      <div className={ classes.footer }>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.button}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
