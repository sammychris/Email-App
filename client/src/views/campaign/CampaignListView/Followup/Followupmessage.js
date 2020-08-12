import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  subject: {
    fontSize: 27,
    width: '100%',
  },

  container: {
    width: '100%',
    height: 250,
    overflowY: 'auto',
    padding: 10 
  },

  button: {
    margin: theme.spacing(1),
  },
  footer: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
  cancel: {
    cursor: 'pointer'
  },
  selectOptions: {
    display: 'flex',
    padding: '0 10px',
    justifyContent: 'space-between',
  },
  prevMessage: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
    width: '65%',
  },
  listStatus: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
    width: '25%',
  },
}));

export default function Followupmessage(props) {
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
      <div>
        <div className={classes.selectOptions}>
            <FormControl className={classes.prevMessage} variant={'outlined'}>
                <InputLabel id="demo-simple-select-filled-label">(Optional) Select Previously Saved Messages Here</InputLabel>
                <Select
                // name="messageId"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                // value={ messageId }
                // onChange={ event => handleChange(event) }
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="">The lord is my shield</MenuItem>
                    <MenuItem value="">The lord is my shield</MenuItem>
                    <MenuItem value="">The lord is my shield</MenuItem>
                    <MenuItem value="">The lord is my shield</MenuItem>
                    {/* { messageOption.map((message, i) => <MenuItem value={ message.id } key={ i } >{ message.subject }</MenuItem>) } */}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.listStatus}>
              <InputLabel htmlFor="outlined-age-native-simple">List Status</InputLabel>
              <Select
                native
                // value={state.age}
                // onChange={handleChange}
                label="Filter By Campaign Status"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Read</option>
                <option value={20}>Unread</option>
                <option value={30}>Bounced</option>
                <option value={30}>Spammed</option>
                <option value={30}>Unsubscribed</option>
              </Select>
            </FormControl>
        </div>
        <div style={{ padding: '10px'}}>
            <TextField className={ classes.subject } id="outlined-basic" label="Suject" variant="outlined" />
        </div>
        <div id="selector" className={ classes.container } ></div>
        <div className={ classes.footer }>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.button}
            onClick={props.handlePage}
          >
            Next
          </Button>
        </div>
    </div>
  );
}
