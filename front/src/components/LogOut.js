import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadingAC, loadedAC, logOutAC } from '../store/actions';
import Spinner from './Spinner/Spinner';

export default function LogOut() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);

  async function logOutHandler() {
    dispatch(loadingAC());
    const response = await fetch('/auth/signout', {
      method: 'POST',
    });
    if (response) {
      const result = await response.json();
      if (!result.session) {
        dispatch(logOutAC());
      }
      console.log('Успешный выход');
    } else {
      console.log('Ошибка в выходе из системы');
    }
    dispatch(loadedAC());
  }
  return (
    <div>
      <span>Чтобы выйти из учётной записи, нажмите </span>
      <button
        onClick={() => logOutHandler()}
        type='button'
        className='btn btn-primary pl-2'
      >
        Выйти
      </button>
      {loading && <Spinner />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
