import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "../Main";
import "./App.css";
import Navbar from "../Navbar";
import Home from "../Home";
import Drawer from "../Drawer";

import LetterForm from "../../pages/LetterForm";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
