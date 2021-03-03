import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Main from '../Main';
import './App.css';
import Navbar from '../Navbar';
import Home from '../Home';

import FileUpload from '../FileUpload/FileUpload';

function App() {
  return (
    <BrowserRouter>
      {/*<Navbar />*/}
      <div className="App ">
        {/*<Main />*/}
      </div>
      <Link to="/upload">Добавить фото / видео</Link>
      <Switch>
        <Route exact path="/">
          {/*<Home />*/}
        </Route>
        <Route exact path="/upload">
          <FileUpload />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
