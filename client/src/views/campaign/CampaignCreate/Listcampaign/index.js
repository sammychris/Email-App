import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Divider,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';

import Importlist from './Importlist';

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

export default function Listcampaign(props) {
  const classes = useStyles();
  const { name, handleChange } = props;

  const [state, setState] = React.useState({
    newList: false,
  });

  function importList(){
      console.log(newList)
    setState({...state, newList: !newList });
  }

  const {newList} = state;

  return (
    <Box mt={3}>
        <Card>
            <CardHeader
                subheader="List"
                />
            <Divider />
            <CardContent>
                <Box maxWidth={500} display="flex" alignItems="center">
                    <Box width="70%">
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Choose A List</InputLabel>
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
                    <Box width="30%" display="flex" justifyContent="center" onClick={importList}>
                        <Tooltip title="Import New List " aria-label="Import New List">
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Box>
            </CardContent>
        </Card>
        { newList ? <Importlist importList={importList} /> : '' }
    </Box>
  );
}
