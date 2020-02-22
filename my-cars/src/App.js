import React, {useState, useEffect} from 'react';
import Home from './Components/Home/Home.jsx';
import { Router, Route, Switch, withRouter, Redirect } from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
