import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadingAC, loginAC, loadedAC } from '../store/actions';
import Spinner from '../components/Spinner/Spinner';

export default function Auth() {
  const { isAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    login: '',
    email: '',
    password: ''
  });
  const classStatus = 'btn btn-primary';
  const { loading, error } = useSelector((state) => state);

  function inputChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value
    });
  }
  async function registrationHandler() {
    dispatch(loadingAC());
    const response = await fetch('/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...input })
    });
    dispatch(loadedAC());
    return response;
  }

  async function clickRegistration() {
    const response = await registrationHandler();
    if (response.status === 200) {
      console.log('You got the reply from back');
    } else if (response.status === 401) {
      console.log('You are already registered, try login');
    } else {
      alert("the user isn't registered or wrong password");
    }
    dispatch(loadedAC());
  }

  async function loginHandler() {
    dispatch(loadingAC());
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...input })
    });
    if (response.status === 200) {
      const result = await response.json();
      if (result.user && result.user.id) {
        const {
          id, login, email, note
        } = result.user;
        dispatch(loginAC(id, login, email, note));
      }
      console.log('Welcome! Enjoy the web-site');
    } else {
      alert("the user isn't registered or wrong password");
    }
    dispatch(loadedAC());
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Login</label>
          <input
            onChange={inputChange}
            type="text"
            name="login"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter login"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail2">Email</label>
          <input
            onChange={inputChange}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={inputChange}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button
          onClick={() => clickRegistration()}
          type="button"
          className={classStatus}
        >
          Registration
        </button>
        <button
          onClick={() => loginHandler()}
          type="button"
          className="btn btn-primary ml-2"
        >
          LogIn
        </button>
      </form>

      {loading && <Spinner />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
