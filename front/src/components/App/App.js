import {
  BrowserRouter,
  Switch,
  Route
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
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
