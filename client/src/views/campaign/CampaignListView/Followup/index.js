import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { X as CancelIcon } from 'react-feather';
import { Link } from 'react-router-dom';

import Followupmessage from './Followupmessage';
import Followupscheduler from './Followupscheduler';

import { createBrowserHistory } from 'history';
let history = createBrowserHistory();


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    border: '1px solid rgba(224, 224, 224, 1)',
    width: '90%',
    maxWidth: 700,
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
  cancel: {
    cursor: 'pointer',
    '&:hover': {
      background: "#b1b1b1",
      color: '#e6e6e6',
    },
  }
}));

export default function Followup(props) {
  const classes = useStyles();
  const { useState, useEffect } = React;

  const [state, setState] = useState({
      schPage: false,
  });

  const { schPage } = state;

  function handleSchd() { // After the completed button is clicked...
    setState({...state, schPage: false}); //setting it back to first page...
  }

  function handlePage() {
      setState({...state, schPage: !schPage});
  }

  const heading = schPage? 'Schedule A Follow Up Campaign' : 'Create A Followup Message';

  return (
    <div className={ classes.root } >
        <div className={classes.header}> { heading }  <CancelIcon className={classes.cancel} onClick={() => history.back()}/></div>
        { schPage ? <Followupscheduler handlePage={handlePage} handleSchd={handleSchd} /> : <Followupmessage handlePage={handlePage} /> }
    </div>
  );
}
