import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';

import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    container: {
        // width: '90%',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
    },

}));

export default function Namecampaign(props) {
  const classes = useStyles();
  const { name, handleChange } = props;

  return (
    <div className={ classes.root }>
        <div className={ classes.container }>

            <Box mt={3}>
                <Card>
                    <CardHeader
                        title="Create A Campaign"
                        subheader="Name"
                    />
                    <Divider />
                    <CardContent>
                        <Box maxWidth={700}>
                        <TextField
                            fullWidth
                            // InputProps={{
                            //   startAdornment: (
                            //     <InputAdornment position="start">
                            //       <SvgIcon
                            //         fontSize="small"
                            //         color="action"
                            //       >
                            //         <SearchIcon />
                            //       </SvgIcon>
                            //     </InputAdornment>
                            //   )
                            // }}
                            id="filled-basic"
                            label="Enter Campaign Name"
                            variant="outlined"
                        />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </div>
    </div>
  );
}
