import React from 'react';
import { useSelector } from 'react-redux';
import Auth from '../pages/Auth';
import Spinner from './Spinner/Spinner';

export default function Main() {
  const { isAuth, loading, error } = useSelector((state) => state);
  console.log('isAuth', isAuth)
  return (
    <div className="d-flex justify-content-around">
      {loading && <Spinner />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isAuth && <Auth />}
    </div>
  );
}
