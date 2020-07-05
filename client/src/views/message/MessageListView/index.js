import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   makeStyles
// } from '@material-ui/core';

import {
  Container,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';


import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import EditDelete from './EditDelete';
import Messagetitle from './Messagetitle';
import Readmessage from './Readmessage';
import Writemessage from './Writemessage';
import Updatemessage from './Updatemessage';
import data from './data';
import { check } from 'prettier';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MessageListView = () => {
  const classes = useStyles();
  const [ state, setState ] = useState({
    isComposed: false,
    isSelected: false,
    isNotEditable: false,
    isUpdated: false,
    active: undefined,
    messages: [],
  });

  useEffect(() => {
    fetch('/api/message')
    .then(res => res.json())
      .then(res => {
        const { err, messages } = res;
        if(err) {
          return console.log(err);
        }
        console.log(messages, 'messages')

        setState({ ...state, messages: messages.reverse() });
      }).catch(err => console.log(err))
  }, []);

  const {isComposed, isUpdated, isSelected, isNotEditable, messages, active, updated} = state;

  function compose() {
    setState({...state, isComposed: !isComposed });
  }

  function update() {
    setState({...state, isUpdated: !isUpdated });
  }

  // const update = () => {
  //   setState({
  //     ...state,
  //     updated: updated + 1,
  //     isSelected: false,
  //     isnoteditable: false,
  //   });
  // }

  const handleActive = (id, index) => () => {
    setState({ ...state, active: index });
  }

  function editDelete(checks){

    if(checks.length){ // if items checked is more than zero

      if(checks.length > 1 ) setState({...state, isSelected: true, isNotEditable: true }); // if items is more than one, make it uneditable!
      else setState({...state, isSelected: true, isNotEditable: false }); // else make it editable

    } else {
      setState({...state, isSelected: false });
    }
  }

  // Setting States
  const messageTitleState = { messages, active, handleActive, editDelete, updated };
  const readMessageStates = { message: messages[active], compose };
  // const SelectFieldsStates = { update };
  // const editDeleteStates = { isnoteditable, editDelete, selectedListIds, update };

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth="lg">

        <Toolbar compose={compose} />

        <Box mt={3}>

          { isSelected ? <EditDelete isNotEditable={isNotEditable} editDelete={editDelete} update={update} /> : '' }

          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              lg={3}
              md={6}
              xs={12}
            >
              <Messagetitle states={messageTitleState} />
            </Grid>
            <Grid
              item
              lg={9}
              md={6}
              xs={12}
            >
              <Readmessage states={readMessageStates} />
              { isComposed ? <Writemessage compose={compose} /> : '' }
              { isUpdated ? <Updatemessage update={update} /> : '' }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default MessageListView;
