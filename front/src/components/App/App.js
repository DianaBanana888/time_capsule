import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Main from '../Main';
import './App.css';
import Navbar from '../Navbar';
import Home from '../Home';

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
          Машин компонент внутри которого Сашин компонент файл аплоад
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
