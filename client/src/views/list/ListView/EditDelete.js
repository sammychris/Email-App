import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
        margin: theme.spacing(1),
    },
  },
}));

const EditDelete = ({ className, ...rest }) => {
  const classes = useStyles();

  const { isnoteditable, editDelete, selectedListIds, update } = rest.states;

   const deleteList = () => {

    fetch('/api/import/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: selectedListIds })
    }).then(res => res.json())
      .then(res => {
        const {message, err} = res;
        if(err) {
          return console.log('Could not delete');
        }
        console.log(message);
        update();
      });
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <Link to='?import=update'>
          <Button
            color="primary"
            variant="outlined"
            style={{marginRight: '20px'}}
            disabled={isnoteditable}
            // onClick={rest.update}
          >
            Edit
          </Button>
        </Link>
        <Button
          color="secondary"
          variant="outlined"
          style={{marginRight: '20px'}}
          onClick={deleteList}
          >
            Delete
        </Button>
        <Button color="secondary" variant="outlined">Export</Button>
      </Box>
    </div>
  );
};

EditDelete.propTypes = {
  className: PropTypes.string
};

export default EditDelete;
