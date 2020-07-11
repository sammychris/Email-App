import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { X as CancelIcon} from 'react-feather';
import { Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();


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

export default function ImportList(props) {
  const classes = useStyles();
  const { useState, useEffect } = React;

  const [state, setState] = useState({
    csvfile: {}, data: {},  listname: '', imported: false,
  });

  const { csvfile, data, listname, imported } = state;


  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('csvfile', csvfile.files[0]);
    formData.append('name', listname);

    fetch('/api/importcsv/', {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(res => {
        const { data, err } = res;
        if(err) {
          console.log(err)
          return setState({ ...state, imported: false });
        }
        console.log(data, 'This is perfect!');
        setState({ ...state, data, listname, imported: true });
        localStorage.setItem('list', JSON.stringify({ listname, data }));
      });

  };


  return (
    <form className={ classes.root } onSubmit={ handleSubmit } >
      <div className={classes.header}>
        New List <CancelIcon className={classes.cancel} onClick={() => history.back()}/>
      </div>
      <div style={{ padding: '10px'}}>
        <TextField
          required
          className={ classes.subject }
          id="outlined-basic"
          label="List Name"
          variant="outlined"
          onChange={ (e) => setState({ ...state, listname: e.target.value}) }
        />
      </div>
      <div className={classes.container}>
        <h4>Choose a CSV or Excel file</h4>
        <input
          required
          type="file"
          accept="text/csv"
          className={classes.fileInput}
          onChange={ (e) => setState({ ...state, csvfile: e.target }) }
        />
      </div>
      <div className={ classes.footer }>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          color="primary"
          className={classes.button}
        >
          Import
        </Button>
      </div>
      { imported ? <Navigate to="?import=choosefields" /> : '' }
    </form>
  );
}
