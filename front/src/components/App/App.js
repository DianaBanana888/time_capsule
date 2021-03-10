import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
import DateFnsUtils from '@date-io/date-fns';
import LetterForm from '../../pages/LetterForm';
import Drawer from '../Drawer';
import MyAccount from '../../pages/MyAccount';
import { loginAC } from '../../store/actions';

function App() {
  const { isAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(async () => {
    if (isAuth) {
      const response = await fetch('/auth/essential', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      });
      if (response.status === 200) {
        const result = await response.json();
        if (result.user && result.user.id) {
          const {
            id, login, email, note
          } = result.user;
          dispatch(loginAC(id, login, email, note));
        }
      }
    }
  }, []);
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
            <Route exact path="/myAccount">
              <MyAccount />
            </Route>
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
