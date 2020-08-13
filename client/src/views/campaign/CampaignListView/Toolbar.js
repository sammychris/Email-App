import React from 'react';
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
  FormControl,
  InputLabel,
  Select,
  makeStyles
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    width: 180,
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Link to='/app/campaigns/create'>
          <Button
            color="primary"
            variant="contained"
          >
            New Campaign
          </Button>
        </Link>
      </Box>
      <Box mt={3}>
        <Card>
          <CardHeader
            title="Campaigns"
            subheader="All Campaigns"
          />
          <Divider />
          <CardContent>
            <Box width='100%' display='flex' alignItems='center'>
              <Box maxWidth={400} width='50%'>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search campaigns"
                  variant="outlined"
                />
              </Box>
              <Box>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">Campaign Status</InputLabel>
                  <Select
                    native
                    value={state.age}
                    onChange={handleChange}
                    label="Filter By Campaign Status"
                    inputProps={{
                      name: 'age',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Pending</option>
                    <option value={20}>Progressing</option>
                    <option value={30}>Delivered</option>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
