import React, { useState } from 'react';

import {
  Box,
  makeStyles,
  Tooltip
} from '@material-ui/core';

import { X as CancelIcon} from 'react-feather';

import TableList from './TableList';

const useStyles = makeStyles((theme) => ({
  statusLabel: {
    color: '#505050c7',
    fontFamily: 'Roboto',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    backgroundColor:'#dedede',
    padding: '2px 7px',
    fontFamily: 'Roboto',
    margin: '0 10px',
    cursor: 'pointer',
    borderRadius: 5,
    '&:hover': {
      background: "#b1b1b1",
      fontWeight: 'bolder',
    },
  },
  activeStatus: {
    fontSize: 12,
    backgroundColor:'#fff',
    padding: '2px 7px',
    fontFamily: 'Roboto',
    margin: '0 10px',
    cursor: 'pointer',
    borderRadius: 5,
    fontWeight: 'bolder',
    '&:hover': {
      background: "#b1b1b1",
    },
  },
  cancel: {
    cursor: 'pointer',
    '&:hover': {
      background: "#b1b1b1",
      color: '#e6e6e6',
    },
  }
}));

const ListStatus = (props) => {
  const classes = useStyles();


  return (
    <Box height={40} display='flex' justifyContent='space-between'>
        <Box>
            <span className={classes.statusLabel}>
                Filter list by status:
            </span>
            <span className={classes.activeStatus}>All</span>
            <span className={classes.status}>Read</span>
            <span className={classes.status}>Unread</span>
            <span className={classes.status}>Bounced</span>
            <span className={classes.status}>Spammed</span>
            <span className={classes.status}>Unsubcribed</span>
        </Box>
        <Box>
            <Tooltip title='close'>
                <CancelIcon className={classes.cancel} onClick={props.openAndClose}/>
            </Tooltip>
        </Box>
    </Box>
  );
};

export default ListStatus;
