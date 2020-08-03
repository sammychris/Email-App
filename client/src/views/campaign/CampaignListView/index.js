import React, { useState, useEffect } from 'react';

import {
  Container,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';

import { useLocation } from 'react-router-dom';


import Page from 'src/components/Page';
import Results from './Results';
import EditDelete from './EditDelete';
import Campaigntitle from './Campaigntitle';
import Viewcampaign from './Viewcampaign';
import Newcampaign from './Newcampaign';
import Followup from './Followup'
import Toolbar from './Toolbar';
import Campaigndata from './Campaigndata';
import data from './data';
import CampaignList from './CampaignList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
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

const CampaignListView = () => {
  const classes = useStyles();
  //const [customers] = useState(data);

  const [state, setState] = useState({
    isFollowup: false,
    isSelected: false,
    isNotEditable: false,
    isUpdated: false,
    campaigns: [],
  });

  let params = new URLSearchParams(useLocation().search);
  let campaign = params.get("c");

  const { isFollowup, isUpdated, isSelected, isNotEditable, campaigns } = state;

  useEffect(() => {
    fetch('/api/campaign')
    .then(res => res.json())
      .then(res => {
        const { err, campaigns } = res;
        if(err) {
          return console.log(err);
        }
        console.log(campaigns, 'campaigns')

        setState({ ...state, campaigns: campaigns.reverse() });
      }).catch(err => console.log(err))
  }, []);


  // function sendFollowup(){
  //   setState({...state, isFollowup: !isFollowup });
  // }


  function update() {
    setState({...state, isUpdated: !isUpdated });
  }


  function editDelete(checks){

    if(checks.length){ // if items checked is more than zero

      if(checks.length > 1 ) setState({...state, isSelected: true, isNotEditable: true }); // if items is more than one, make it uneditable!
      else setState({...state, isSelected: true, isNotEditable: false }); // else make it editable

    } else {
      setState({...state, isSelected: false });
    }
  }

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth="lg">

        <Toolbar />

        <Box mt={5}>

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
              <Campaigntitle editDelete={editDelete}/>
            </Grid>
            <Grid
              item
              lg={9}
              md={6}
              xs={12}
            >
              <CampaignList />
              <Viewcampaign />
              { campaign === 'followup' ? <Followup /> : '' }
              { campaign === 'new' ? <Newcampaign /> : '' }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default CampaignListView;
