import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Fab,
  Tooltip,
} from '@material-ui/core';


import Createmessage from './Createmessage';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    container: {
        // width: '90%',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    subject: {
        width: '70%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        maxWidth: 500,
      },
}));

export default function Messagecampaign(props) {
  const classes = useStyles();
  const { name, handleChange } = props;
  const [state, setState] = React.useState({
    newMessage: false,
  });

  const {newMessage} = state;

  function compose(){
    setState({...state, newMessage: !newMessage });
  }

  return (
    <Box mt={3}>
        <Card>
            <CardHeader
                subheader="Message"
                />
            <Divider />
            <CardContent>
                <Box maxWidth={500} display="flex" alignItems="center">
                    <Box width="70%">
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Choose A Message</InputLabel>
                            <Select
                            name="list"
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            // value={ list }
                            // onChange={ handleChange }
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {/* { listOption.map((item, i) => <MenuItem value={ JSON.stringify({ listId: item.id, listLength: item.length }) } key={ i } >{ item.name }</MenuItem>) } */}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box width="30%" display="flex" justifyContent="center" onClick={compose}>
                        <Tooltip title="Compose New Message" aria-label="Compose New Message">
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Box>
            </CardContent>
        </Card>
        { newMessage ? <Createmessage compose={compose} /> : '' }
    </Box>
  );
}
