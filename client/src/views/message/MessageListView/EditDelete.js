import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
        margin: theme.spacing(1),
    },
  },
}));

const EditDelete = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <Button
            color="primary"
            variant="outlined"
            style={{marginRight: '20px'}}
            disabled={rest.isNotEditable}
            onClick={rest.update}
        >
            Edit
        </Button>
        <Button color="secondary" variant="outlined">Delete</Button>
      </Box>
    </div>
  );
};

EditDelete.propTypes = {
  className: PropTypes.string
};

export default EditDelete;
