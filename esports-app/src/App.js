import './App.css';

import {Home} from './Home';
import {Player} from './Player';
import {Team} from './Team';
import React from 'react';
import Navbar from './Components/Navbar';

import {BrowserRouter, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
      <Navbar/>

      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/player' component={Player}/>
        <Route path='/team' component={Team}/>
      </Switch>
    </React.Fragment>
    </BrowserRouter>
  )
}

export default App;
