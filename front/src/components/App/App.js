import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../Main';
import './App.css';
import Navbar from '../Navbar';
import Home from '../Home';

import LetterForm from '../../pages/LetterForm';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App ">
        <Main />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/create">
          <LetterForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
