import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import { X as CancelIcon} from 'react-feather';


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
  container : {
    padding: '60px 70px',
  },
  subject: {
    fontSize: 16,
    width: '100%',
  },
  formControl: {
    minWidth: 450,
  },
  row: {
    display: 'flex',
    marginTop: theme.spacing(6),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  span: {
    cursor: 'pointer',
    color: '#0574d8',
    textDecoration: 'underline',
    paddingBottom: '6px',
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
  const { useState, useEffect } = React;

  const [state, setState] = useState({
    lists: [], messages: [], campaignName: '', listId: '', messageId: '',
  });

  const { lists, messages, campaignName, listId, messageId } = state;

  function handleSubmit(e){
    e.preventDefault();
    const { campaignName, listId, messageId} = state;

    fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ campaignName, listId, messageId }),
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
  }


  function handleChange(e) {
      const {name, value} = e.target;
      console.log(name, value)
      setState({ ...state, [name]: value });
  }


  useEffect(() => {

    fetch('/api/import')
    .then(res => res.json())
    .then(res => {
        const { err, lists } = res;
        if(err) return console.log(err);
        
        fetch('/api/message')
        .then(res => res.json())
          .then(res => {
            const { err, messages } = res;
            if(err) return console.log(err);
            setState({ ...state, lists: lists.reverse(), messages: messages.reverse() });
        
          }).catch(err => console.log(err))

    }).catch(err => console.log(err))

   

  }, []);

  return (
    <form className={ classes.root } onSubmit={ handleSubmit }>
      <div className={classes.header}>New Campaign <CancelIcon className={classes.cancel} onClick={props.compose}/> </div>
      <div className={classes.container}>
            <TextField
                required
                className={ classes.subject }
                label="Enter Campaign Name"
                variant="outlined"
                onChange={ handleChange }
                name="campaignName"
                value={ campaignName }
            />
            <div className={ classes.row } >
                <FormControl className={classes.formControl} required variant="outlined"> 
                    <InputLabel id="demo-simple-select-label">Select a list</InputLabel>
                    <Select
                        name="listId"
                        value={ listId }
                        onChange={ handleChange }
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        { lists.map((item, i) => <MenuItem value={item._id} key={i}>{ item.name }</MenuItem>)}
                    </Select>
                </FormControl>
                <span className={classes.span}  title="click to create a new list">New List</span>
            </div>
            <div className={ classes.row }>
                <FormControl className={classes.formControl} variant="outlined" required>
                    <InputLabel id="demo-simple-select-label">Select a message</InputLabel>
                    <Select
                        name="messageId"
                        value={ messageId }
                        onChange={ handleChange }
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        { messages.map((item, i) => <MenuItem value={item._id} key={i}>{ item.subject }</MenuItem>)}
                    </Select>
                </FormControl>
                <span className={classes.span} title="click to create a new message">New Message</span>
            </div>           
      </div>
      <div className={ classes.footer }>
        <Button
            type="submit"
            variant="outlined"
            size="large"
            color="primary"
            className={classes.button}
          >
            Create Campaign
        </Button>
      </div>
    </form>
  );
}
