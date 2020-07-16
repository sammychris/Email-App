import React, { useState } from 'react';

import {
  Box,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
} from '@material-ui/core';

import ChevronRight from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    cursor: 'pointer',
    padding: '16px !important',
    display: 'flex',
    fontFamily: 'Roboto',
    color: '#aaa',
    alignItems: 'center',
    '&:hover': {
      background: "#f5f5f5",
      color: 'black',
    },
    '&:hover span': {
      background: "#f5f5f5",
      color: 'black',
    }
  },
  details: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '600px',
  },
  listVal: {
    fontWeight: 'bolder',
    color:'#3f51b5',
  }
  
}));

const ListDetails = (props) => {
  const classes = useStyles();

  return (
    <Box mb={5}>
      <Tooltip title="Open List" aria-label="Open List">
        <Card >
          <CardContent className={classes.cardContent} onClick={props.openAndClose}>
            <ChevronRight /> 
            <div className={classes.details}>
              <div>List Name:        <span className={classes.listVal}>Web Design Client</span></div>
              <div>Total Recipients: <span className={classes.listVal}>2000</span></div>
              <div>Availability:     <span className={classes.listVal}>Checked</span></div>
            </div>
          </CardContent>
        </Card>
      </Tooltip>
    </Box>
  );
};

export default ListDetails;
