import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientEdit from "./components/ClientEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={ClientList}/> 
            <Route path='/api/v1/tasks/:id' component={ClientEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;