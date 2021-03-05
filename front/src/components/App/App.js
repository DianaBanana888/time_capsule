import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "../Main";
import "./App.css";
import Navbar from "../Navbar";
import Home from "../Home";
import Drawer from "../Drawer";

import LetterForm from "../../pages/LetterForm";

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
          {/* <div className="App ">
          <Main />
        </div> */}
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
