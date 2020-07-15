import React, { useState } from 'react';

import {
  Box,
  makeStyles,
  Tooltip
} from '@material-ui/core';

import { X as CancelIcon} from 'react-feather';

import TableList  from './TableList';
import ListStatus from './ListStatus';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

const CampaignTableList = (props) => {
  const classes = useStyles();

  return (
    <Box mb={5}>
      <ListStatus openAndClose={props.openAndClose} />
      <TableList states={props.states} />
    </Box>
  );
};

export default CampaignTableList;
