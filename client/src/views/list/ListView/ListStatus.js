import React, { useState } from 'react';

import {
  Box,
  Button,
  makeStyles,
  Tooltip
} from '@material-ui/core';

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
            <span className={classes.status}>Available</span>
            <span className={classes.status}>Unavailable</span>
            <span className={classes.status}>Unknown</span>
        </Box>
        <Box>
            <Tooltip title='Click to check for email list availability'>
                <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    >
                        Check
                </Button>
            </Tooltip>
        </Box>
    </Box>
  );
};

export default ListStatus;
