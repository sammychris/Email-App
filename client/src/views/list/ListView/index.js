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

import { useLocation, history   } from 'react-router-dom';


import Page from 'src/components/Page';
// import Results from './Results';
import Toolbar from './Toolbar';
import EditDelete from './EditDelete';
import Titlelist from './Titlelist';
import CampaignTableList from './CampaignTableList';
import ImportList from './ImportList';
import UpdateList from './UpdateList';
import SelectFields from './SelectFields';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ListView = () => {
  const classes = useStyles();
  const [ state, setState ] = useState({
    isSelected: false,
    isnoteditable: false,
    lists: [],
    active: undefined,
    updated: 0,
    selectedListIds: [],
  });
  let params = new URLSearchParams(useLocation().search);
  let importList = params.get("import");


  const { isSelected, isnoteditable, lists, active, selectedListIds, updated } = state;

  useEffect(() => {
    fetch('/api/import')
    .then(res => res.json())
      .then(res => {
        const { err, lists } = res;
        if(err) {
          return console.log(err);
        }

        setState({ ...state, lists: lists.reverse() });
      }).catch(err => console.log(err))
  }, [updated]);


  function editDelete(checks, selectIds){
    if(checks.length){ // if items checked is more than zero

      if(checks.length > 1 ) {
        return setState({...state, isSelected: true, isnoteditable: true, selectedListIds: selectIds }); // if items is more than one, make it uneditable!
      }
      return setState({...state, isSelected: true, isnoteditable: false, selectedListIds: selectIds }); // else make it editable

    }
    return setState({ ...state, isSelected: false, selectedListIds: selectIds });
  }


  const handleActive = (id, index) => () => {
    setState({ ...state, active: index });
  }


  const update = () => {
    setState({
      ...state,
      updated: updated + 1,
      isSelected: false,
      isnoteditable: false,
    });
  }

  // Setting States
  const titleListStates = { lists, active, handleActive, editDelete, updated };
  const campaignTableListStates = { propList: lists[active], handleActive };
  const SelectFieldsStates = { update };
  const editDeleteStates = { isnoteditable, editDelete, selectedListIds, update };


  return (
    <Page
      className={classes.root}
      title="List Datas"
    >
      <Container maxWidth="lg">

        <Toolbar />
        
        <Box mt={3}>

          { isSelected ? <EditDelete states={editDeleteStates} /> : '' }

          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              lg={3}
              md={3}
              xs={12}
            >

              <Titlelist states={titleListStates} />

            </Grid>
            <Grid
              item
              lg={9}
              md={9}
              xs={12}
            >
             
              { /** Check if the lists are available before passing it a parent component... */}
              {/* { lists[active] ?  <CampaignTableList states={campaignTableListStates} /> : '' } */}

              <CampaignTableList states={campaignTableListStates} />
              { importList === 'new' ? <ImportList /> : '' }
              { importList === 'update' ? <UpdateList /> : '' }
              { importList === 'choosefields' ? <SelectFields states={SelectFieldsStates}/> : '' }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default ListView;
