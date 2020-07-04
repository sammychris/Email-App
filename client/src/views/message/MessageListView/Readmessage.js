import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    height: 470,
    backgroundColor: '#fff',
    border: '1px solid rgba(224, 224, 224, 1)',
  },
  subject: {
    fontSize: 27,
    width: '100%',
    marginBottom: '10px',
  },
  bodyDiv: {
    //backgroundColor: '#f3f3f5',
    padding: '20px 10px',
    marginBottom: '100px',
    maxWidth: '800px',
    width: '100%',
  },
  body: {
    minHeight: '360px',
  },
  button: {
    position: 'fixed',
    bottom: 10,
    right: 80,
  },
}));

export default function Readmessage(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const [state, setState] = React.useState({
    currMessage: {},
  });
  const { handleDeleteMessage, selectedIndex, message, compose } = props.states;
  const { currMessage } = state;

  // if(messages.length){
  //   message = messages[selectedIndex];
  // }


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if(message){
      if(!state[message._id]) {
        fetch('/api/message/' + message._id)
        .then(res => res.json())
          .then(res => {
            console.log(res)
            const { err, message } = res;
            if(err) return console.log(err);
            console.log(message, 'this is the message')
            //setCurrMessage(message); // store the "list id" in state for later use to avoid api calls again.

            setState({...state, [message._id]: message, currMessage: message });

          }).catch(err => console.log(err))
        
        //setState({...state, isLoading: true })
      }
      else {
        setState({ ...state, currMessage: state[message._id] });
      }
    }

  }, [message]);


  // const currMessage = message ? : {};

  console.log(currMessage, 'currMessage currMessage currMessage currMessage ')

  return (
    <div className={ classes.root } >
      <div className={ classes.subject }>
        <p>{ currMessage.subject }</p>
      </div>
      <div  className={ classes.bodyDiv }>
        <div className={ classes.body } dangerouslySetInnerHTML={{ __html: currMessage.body }} />
      </div>
      <div className={ classes.button }>
          <Tooltip title="Compose" aria-label="Compose">
            <Fab style={{ marginRight: '10px' }} color="secondary" aria-label="compose" onClick={ compose }>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete message" aria-label="Delete message">
            <Fab aria-label="delete" onClick={handleDeleteMessage}>
              <DeleteIcon />
            </Fab>
          </Tooltip>
      </div>
    </div>
  );
}
