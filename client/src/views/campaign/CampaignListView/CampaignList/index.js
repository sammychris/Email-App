import React, { useState } from 'react';

import {
  Box,
  makeStyles
} from '@material-ui/core';

import ListDetails       from './ListDetails';
import CampaignTableList from './CampaignTableList';

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
  }
}));

const Campaign = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
      isClickList: false,
  });

  const {isClickList} = state;

  function openAndClose() {
    //setTimeout(() => {
        setState({...state, isClickList: !isClickList });
    //}, 500);
  }

  return (
    <Box>
        { isClickList ? <CampaignTableList  openAndClose={openAndClose} /> : <ListDetails openAndClose={openAndClose}/> }
    </Box>
  );
};

export default Campaign;
