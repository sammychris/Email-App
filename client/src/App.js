import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.scss';
import { Mailer } from './Mailer'; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    }
  }
  
  componentDidMount(){
    this.setState({ isReady: true });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Mailer} />
        </Switch>
      </Router>
    )
  }

}

export default App;
