import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
   paddingTop: 70,
  },
  container: {
    width: '90%',
    maxWidth: 900,
    margin: 'auto',
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#e6e6ef66',
    height: 300,
    position: 'relative',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonDiv: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectList(props) {
  const classes = useStyles();
  const { useState, useEffect } = React;

  const { list, handleChange} = props;

  const [state, setState] = useState({
    listOption: []
  });

  const { listOption } = state;

  useEffect(() => {
    fetch('/api/import')
    .then(res => res.json())
      .then(res => {
        const { err, lists } = res;
        if(err) {
          return console.log(err);
        }
        console.log(lists)
        setState({ ...state, listOption: lists.reverse().map(a => ({ id: a._id, length: a.list.length, name: a.name })) });
      });
  }, []);

  return (
    <div className={ classes.root }>
      <div className={ classes.container } >
        <p>Select Or Upload A List</p>
        <hr />
        <div className={ classes.body }>
            <span style={{ marginRight: 20, fontWeight: 'bolder' }}>Select A List</span>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Lists</InputLabel>
                <Select
                  name="list"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={ list }
                  onChange={ handleChange }
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                { listOption.map((item, i) => <MenuItem value={ JSON.stringify({ listId: item.id, listLength: item.length }) } key={ i } >{ item.name }</MenuItem>) }
                </Select>
            </FormControl>
        </div>
        <div className={ classes.buttonDiv }>
          <Link to="/lists/create">
            <Tooltip title="Upload A New List" aria-label="Upload A New List">
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Tooltip>
          </Link>
        </div>
      </div>
    </div>
  );
}
