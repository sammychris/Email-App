import React from 'react';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  makeStyles
} from '@material-ui/core';
import { X as CancelIcon } from 'react-feather';

let history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  cancel: {
    cursor: 'pointer',
    '&:hover': {
      background: "#b1b1b1",
      color: '#e6e6e6',
    },
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <CancelIcon className={classes.cancel} onClick={ () => history.back()} />
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
