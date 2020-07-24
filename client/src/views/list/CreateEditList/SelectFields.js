import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

import {
  Box,
  Button,
  InputLabel,
  Select,
  FormControl,
  Divider,
  Checkbox,
  makeStyles
} from '@material-ui/core';


import { X as CancelIcon} from 'react-feather';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    border: '1px solid rgba(224, 224, 224, 1)',
    width: 800,
    position: 'fixed',
    right: 20,
    bottom: 20,
    zIndex: 1100,
    boxShadow: '-11px 11px 20px 0px #0000001a',
  },
  header: {
    background: 'rgb(244, 246, 248)',
    padding: '20px 10px',
    fontSize: '16px',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: `500`,
    color: '#263238',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subject: {
    fontSize: 27,
    width: '100%',
  },

  button: {
    margin: theme.spacing(1),
  },
  footer: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
  cancel: {
    cursor: 'pointer',
    '&:hover': {
      background: "#b1b1b1",
      color: '#e6e6e6',
    },
  },
  fieldOption: {
    fontSize: 13,
    background: 'green',
    padding: '1px 5px',
    margin: 3,
    background: '#3f51b526',
    color:' #3c3c3c',
  }
}));


let ourList = [{
  "mail Address": "Maryam Abisola",
  "Company": "Adefarati",
  "positions": "",
  "field4": "biscobells@yahoo.co.uk",
  "Website": "The Coca-Cola Company",
  "field6": "BU Finance Marketing and Customer Insights - West Africa",
  "mail ": "Maryam Abisola",
},{
  "mail Address": "Maryam Abisola",
  "Company": "Adefarati",
  "positions": "",
  "field4": "biscobells@yahoo.co.uk",
  "Website": "The Coca-Cola Company",
  "field6": "BU Finance Marketing and Customer Insights - West Africa",
  "mail ": "Maryam Abisola",
},{
  "mail Address": "Maryam Abisola",
  "Company": "Adefarati",
  "positions": "",
  "field4": "biscobells@yahoo.co.uk",
  "Website": "The Coca-Cola Company",
  "field6": "BU Finance Marketing and Customer Insights - West Africa",
  "mail ": "Maryam Abisola",
},{
  "mail Address": "Maryam Abisola",
  "Company": "Adefarati",
  "positions": "",
  "field4": "biscobells@yahoo.co.uk",
  "Website": "The Coca-Cola Company",
  "field6": "BU Finance Marketing and Customer Insights - West Africa",
  "mail ": "Maryam Abisola",
}];

let emails = {
  "mail Address": "Maryam Abisola",
  "Company": "Adefarati",
  "positions": "",
  "field4": "biscobells@yahoo.co.uk",
  "Website": "The Coca-Cola Company",
  "field6": "BU Finance Marketing and Customer Insights - West Africa",
  "mail ": "Maryam Abisola",
};

//p[ppolet data = Object.keys(emails);

function emailField(data){
  data = data[0];
  let fields = [];
  let emailField = '';

  //for(let i = 2; i < 2; i++){ // loop through at least first 3 items in the list to check if it contains an email
    for(let key in data) {
      if(/@/.test(data[key])) {
        emailField = key;
        fields.unshift(key);
      } else {
        fields.push(key);
      }
    //}
  }
 // if(!emailField) return false;  // if no email available in the list (Will have to work more on this soon)
  function isMail(item){
    return item === emailField;
  }

  return {fields, isMail};
}

const {fields, isMail} = emailField(ourList); // how find and emails;

const defaultFields = ['Email', 'FirstName', 'LastName', 'FullName','Phone', 'Address', 'Company', 'Location'];


export default function Writemessage(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked: [0], Email: '', FirstName: '', LastName: '',
    FullName: '', Phone: '', Address: '', Company: '', Location: '',
    Fields: {}, joinFields: {},
  });

  
  const {checked, Fields, joinFields} = state;

  const handleToggle = (value, item) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setState({...state, checked: newChecked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let data = {};
    let actualData = {};
    let finalData = {};
    for(let i = 0; i < checked.length; i++) {
      data = { ...data, [checked[i]]: Fields[checked[i]] };
      actualData = { ...actualData, [checked[i]]: joinFields[checked[i]] }
      finalData = {...finalData, [joinFields[checked[i]]]: Fields[checked[i]] }

      //let dataArr = Object.values(data); // get the value data as an array

      
      //actualData = { ...actualData, [joinFields[dataArr[i]]]: dataArr[i] }
    }

    // we will make of the 'data' variable and the 'actualData' variable  - This will also be used for validation

    //console.log(joinFields, 'joinFields')
    console.log(data);
    console.log(actualData);
    console.log(finalData);

    const newList = ourList.map(item => {
      let newObj = {};
      for(let key in finalData){
         newObj[finalData[key]] = item[key];
      }
      return newObj;
    });

    console.log(newList);
  
  }

  const handleChange = (item) => (e) => {
    const {value} = e.target;
    const newValue = JSON.parse(value);
    const linkValue = Object.keys(newValue)[0];
    let newData = {};
    let linkFields = {};

    if (value !== 'None') { 
      newData = { ...Fields, ...newValue };
      linkFields = { ...joinFields, [linkValue]: item }
    }
    setState({...state, Fields: newData, joinFields: linkFields });
  }


  return (
    <form className={ classes.root } onSubmit={ handleSubmit }>
      <div className={classes.header}>
        <h2>This is our self</h2>
      </div>
      <div style={{ padding: '10px', color: '#585858', lineHeight: '1.5', textAlign: 'center', fontFamily: 'Roboto'}}>
        <span>Only selected fields will be import (You should not select more than 4).</span>
        <div>
          <span>These are available field options to select:</span>
          { defaultFields.map(field => <span class={classes.fieldOption}>{field}</span>) } {/******** This is a loop data */}
        </div>
      </div>
      <Divider />
      <div id="selector" style={{ width: '100%', height: 300, overflowY: 'auto', padding: 20 }} >
        {
          // The value variable below means index, it serves as value.
          fields.map((item, value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return(
              <Box maxWidth={'550px'} display={'flex'} margin={'auto'} alignItems={'center'} fontFamily={'Roboto'}>
                <Box display={'flex'} width={'50%'} alignItems={'center'}>
                  <Box width={70}>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value, item)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                      name="Things"
                    />
                  </Box>
                  <FormControl variant="outlined" className={classes.listStatus} size={'small'}>
                    <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                    <Select
                      required
                      native
                      defaultValue={'Email'}
                     // value={ /*isMail(item)? 'Email':*/ null }
                      onChange={handleChange(item)}
                      disabled={checked.indexOf(value) === -1}
                      label="Filter By Campaign Status"
                      inputProps={{
                        name: 'Fields', 
                        id: 'outlined-fields-native-simple',
                      }}
                    >
                      <option aria-label="None" value="">None</option>
                      {/* 
                        This reason for value={(index + 1)*10}. was because I wanted to start the index from 1 instead of zero(0).
                        And to multiply by 10 means to get the product of 10, 20, 30... And the value of each individual items.
                      */}
                      { defaultFields.map(field => <option value={JSON.stringify({ [value]: field })}>{field}</option>) } {/******** This is a loop data */}
                    </Select>
                  </FormControl>
                </Box>
                <Box width={'50%'} fontWeight={'bolder'} fontSize={16} color={checked.indexOf(value) === -1? '#b3b3b3': '#3f51b5'}>
                  {item}
                </Box>
              </Box>
            );
          })
        }
      </div>
      <div className={ classes.footer }>
        <Button
          type='submit'
            variant="outlined"
            size="large"
            color="primary"
            className={classes.button}
            // onClick={handleSubmit}
          >
          Submit
        </Button>
      </div>
    </form>
  );
}
