import React from 'react';
import { useSelector } from 'react-redux';
import Auth from '../pages/Auth';

export default function Main() {
  const { isAuth } = useSelector((state) => state);
  return (
    <div className="d-flex justify-content-around">
      {!isAuth && <Auth />}

    </div>
  );
}
