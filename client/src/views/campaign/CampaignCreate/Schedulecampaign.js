import React from 'react';

//import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { withStyles } from '@material-ui/core/styles';
// import Select from '@material-ui/core/Select';
// import AddIcon from '@material-ui/icons/Add';
// import Fab from '@material-ui/core/Fab';
// import Tooltip from '@material-ui/core/Tooltip';


import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Divider,
  InputAdornment,
  SvgIcon,
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // root: {
  //  paddingTop: 70,
  // },
  // container: {
  //   width: '90%',
  //   maxWidth: 900,
  //   margin: 'auto',
  //   textAlign: 'center',
  //   padding: '50px',
  //   backgroundColor: '#e6e6ef66',
  //   height: 300,
  //   position: 'relative',
  // },
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 150,
  //   width: '80%',
  // },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: '70%',
  // },
  // row: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: '10px 0',
  // },
  // radio: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  //   width: '70%'
  // },
  // span: {
  //   width: '30%',
  //   fontWeight: 'bolder',
  //   textAlign: 'left',
  // }

  textFieldNumber: {
    width: '100%',
  },
  textFieldTime: {
    width: 100,
  },
  radio: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '65%',
    },
}));


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default function Scheduler(props) {
  const classes = useStyles();
  const { handleChange, daily, time, options } = props;

  return (
        <Box mt={3}>
          <Card>
              <CardHeader
                  subheader="Schedule"
                />
              <Divider />
              <CardContent>
                <Box
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
                 p={2}
                >
                  <Box width="35%" fontWeight="bolder" fontSize="20px">
                    Spread out:
                  </Box>
                  <Box
                    width="65%"
                  >
                    <TextField
                      name="daily"
                      onChange={handleChange}
                      label="Emails per day"
                      id="filled-start-adornment"
                      type="number"
                      variant="filled"
                      defaultValue={daily}
                      className={classes.textFieldNumber}
                      
                    />
                  </Box>
                </Box>
                <Box
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
                 p={2}
                >
                  <Box width="35%" fontWeight="bolder" fontSize="20px" >
                    Send Time:
                  </Box>
                  <RadioGroup aria-label="Send when" name="options" row className={classes.radio}>
                    <FormControlLabel value="now" control={<Radio />} label="Now" />
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <FormControlLabel value="schedule" control={<Radio />} label="Schedule" />
                      <TextField
                        label="set time"
                        variant="filled"
                        className={classes.textFieldTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </Box>
                  </RadioGroup>
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                >
                  Send Campaign
                </Button>
              </CardActions>
          </Card>
        </Box>
  );
}
