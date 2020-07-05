import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    border: '1px solid rgba(224, 224, 224, 1)',
  },
  items: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  active: {
    paddingTop: 20,
    paddingBottom: 20,
    color: '#495dcb',
    background: '#0098f733',
  },
}));

export default function Messagetitle(props) {
  const classes = useStyles();

  const [updated, setUpdated] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const [listChecked, setListChecked] = React.useState([]);

  const {editDelete, messages, active, handleActive} = props.states;

  // const handleToggle = (value) => () => {
  //   console.log(value, 'value')
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  //   editDelete(newChecked); // checks in order to allow users to edit and delete an item...
    
  // };
  

  const handleToggle = (id, index) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];
    const selectIds = [...listChecked];

    if (currentIndex === -1) {
      newChecked.push(index);
      selectIds.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
      selectIds.splice(currentIndex, 1);
    }
    
   
    setChecked(newChecked);
    setListChecked(selectIds);

    editDelete(newChecked, selectIds); // checks in order to allow users to edit and delete an item...
  };

  // React.useEffect(() => {
  //   // after updating unselect all lists
  //   if (updated) {
  //     setChecked([]);
  //     setListChecked([]);
  //   }
  //   setUpdated(true);
  // }, [props.states.updated]);

  return (
    <List dense className={classes.root}>
      {messages.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem key={index} button className={ active === index ? classes.active : classes.items} onClick={handleActive(item._id, index)}>
            <ListItemAvatar>
              <Avatar
                alt={item.subject}
                src={item.subject}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={ item.subject } />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(item._id, index)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
