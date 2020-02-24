import React, {useState, useEffect} from 'react';
import Home from './Components/Home/Home.jsx';
import ShowCars from "./Components/ShowCars/ShowCars.jsx"
import AddForm from "./Components/AddForm/AddForm.jsx"
import UpdateForm from "./Components/UpdateForm/UpdateForm.jsx"
import SearchBar from "./Components/SearchBar/SearchBar.jsx"
import { Router, Route, Switch, withRouter, Redirect } from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cars" exact component={ShowCars} />
          <Route path="/addCar" exact component={AddForm} />
          <Route path="/search" exact component={SearchBar} />
          <Route path="/update" exact component={UpdateForm} />
      </Switch>
    </div>
  );
}

export default App;
