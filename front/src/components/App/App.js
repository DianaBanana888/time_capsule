import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "../Main";
import "./App.css";
import Navbar from "../Navbar";
import Home from "../Home";

import LetterForm from '../../pages/LetterForm';
import React from 'react';
import Drawer from "../Drawer";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// pick a date util library
import MomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import LuxonUtils from "@date-io/luxon";

function App() {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter>
          <Drawer />

          <Switch>
            {/* <Route exact path="/">
              <Home />
            </Route> */}
            <Route exact path="/create">
              <LetterForm />
            </Route>
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
