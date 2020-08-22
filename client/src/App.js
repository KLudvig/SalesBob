import React from 'react';
import './App.css';
import { Leads } from './components/Leads/Leads';
import { Settings } from './components/Settings/Settings';
import { Statistics } from './components/Statistics/Statistics';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Leads} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/statistics" exact component={Statistics} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
