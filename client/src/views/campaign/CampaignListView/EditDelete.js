import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
        margin: theme.spacing(1),
    },
  },
}));

const EditDelete = ({ className, ...rest }) => {
  const history = createBrowserHistory();
  const classes = useStyles();

  const [state, setState] = React.useState({
      push: false,
  });

  const {push} = state;

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <Link to='/app/campaigns/create'>
            <Button
                color="primary"
                variant="outlined"
                style={{marginRight: '20px'}}
                disabled={rest.isNotEditable}
                // onClick={() => history.push('/app/campaigns/create', () => setState({...state, push: true }))}
            >
                Edit To REUSE
            </Button>
        </Link>
        <Button color="secondary" variant="outlined">Delete</Button>
      </Box>
    </div>
  );
};

EditDelete.propTypes = {
  className: PropTypes.string
};

export default EditDelete;
