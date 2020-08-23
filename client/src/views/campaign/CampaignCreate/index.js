import React from 'react';
import {
  Box,
  Grid,
  Container,
  makeStyles
} from '@material-ui/core';



import Page from 'src/components/Page';
import Namecampaign 	  from './Namecampaign';
import Listcampaign 	  from './Listcampaign';
import Messagecampaign 	from './Messagecampaign';
import Schedulecampaign from './Schedulecampaign';
// import Submitcampaign	  from './Submitcampaign';
import Testmail         from './Testmail';
import Toolbar from './Toolbar';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));



function POST(api, obj){
  return fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...obj })
  })
  .then(res => res.json())
}



export default function CampaignCreate(props) {
  const classes = useStyles();
  const { useState } = React;

  const [state, setState] = useState({
    page: 0,
    disable: false,
    name: '',
    list: '{}', // Allow JSON.parse function to work correctly...
    messageId: '',
    daily: '450',
    time: new Date().getHours() + ':' + new Date().getMinutes(),
    options: 'now'
  });

  const { page, disable, name, list, messageId, daily, time, options } = state;

  const { listId, listLength } = JSON.parse(list);

  function handleChange(e) {
    console.log(state);
    const { name, value } = e.target;
    setState({ ...state, [name]: value, disable: value.length > 3 });
  }

  function movePages (n) {
    const newpage = page + n;
    if(newpage === 0 ) return setState({ ...state, page: newpage, disable: name.length > 3 });
    if(newpage === 1 ) return setState({ ...state, page: newpage, disable: list.length > 3 });
    if(newpage === 2 ) return setState({ ...state, page: newpage, disable: messageId.length > 3 });
    return setState({ ...state, page: newpage });
  }

  function resetPage () {
    setState({ ...state, page: 0 });
  }

  function handleSubmit(e) {
    e.preventDefault();

    POST('/api/campaign', { name, listId, listLength, messageId, daily, time, options }) // save campaign
      .then(res => {
        const { err, result } = res;
        if(err) {
          return console.log(err);
          //return setState({ message: `Couldn't Create!`, error: true });
        }
        const campaignId = result._id;
        console.log('campaign is saved');

        POST('/api/campaign/send', { time, daily, options, campaignId })
          .then(res => {
            const { err, result } = res;
            if(err) {
              return console.log(err);
            }
            console.log('campaign is sent');
            return console.log(result);
          });
      });
  }

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>

        <Toolbar />

        <Box mt={3}>
          <Namecampaign />
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <Listcampaign />
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <Messagecampaign />
            </Grid>
            
          </Grid>
         
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={7}
              md={6}
              xs={12}
            >
               <Schedulecampaign />
            </Grid>
            <Grid
              item
              lg={5}
              md={6}
              xs={12}
            >
              <Testmail />
            </Grid>
            
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}
