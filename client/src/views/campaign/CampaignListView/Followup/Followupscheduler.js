import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 900,
    width: '100%',
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: '80%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '70%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
  },
  radio: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '70%',
  },
  span: {
    width: '30%',
    fontWeight: 'bolder',
    textAlign: 'left',
  },

  footer: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
  button: {
    margin: theme.spacing(1),
  },
  cancel: {
    cursor: 'pointer'
  },
}));

export default function Followupmessage(props) {
  const classes = useStyles();
  const { handleChange, daily, time, options, handlePage, handleSchd } = props;

  return (
      <div>
        <div className={classes.container}>
            <FormControl variant="filled" className={classes.formControl}>
                <div className={classes.row}>
                    <span className={ classes.span }>Spread out: </span>
                    <TextField
                    name="daily"
                    onChange={handleChange}
                    label="Emails per day"
                    id="filled-start-adornment"
                    type="number"
                    variant="filled"
                    defaultValue={daily}
                    className={classes.textField}
                    />
                </div>
                <div className={classes.row}>
                    <span className={ classes.span }>Send when:</span>
                    <RadioGroup aria-label="Send when" name="options" value={options} className={classes.radio} onChange={handleChange} row >
                        <FormControlLabel value="now" control={<Radio />} label="Now" />
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        <FormControlLabel value="schedule" control={<Radio />} label="Schedule" />
                        <TextField
                            onChange={handleChange}
                            disabled={options !== 'schedule'}
                            id="time"
                            label="set time"
                            type="time"
                            name="time"
                            defaultValue={ time }
                            className={classes.textField}
                            variant="filled"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                        />
                        </div>
                    </RadioGroup>
                </div>
            </FormControl>
            </div>
            <div className={ classes.footer }>
                <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    className={classes.button}
                    onClick={handlePage}
                >
                    Prev
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    className={classes.button}
                    onClick={handleSchd}
                >
                    Complete
                </Button>
            </div>
    </div>
  );
}
