import React from 'react';
import {
  Link
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOut from './LogOut';

export default function Navbar() {
  const { isAuth } = useSelector((state) => state);
  return (
    <div>
      <Link to="/"><button type="button" className="btn btn-dark">Home</button></Link>
      <Link to="/create"><button type="button" className="btn btn-success">Создать послание</button></Link>
      {isAuth && <LogOut />}
    </div>
  );
}
