import React from 'react';

import { useSelector } from 'react-redux';
import SingleNote from '../components/SingleNote';

export default function MyAccount() {
  const { userName, note } = useSelector((state) => state);
  return (
    <div>
      <h3>Добрый день, {userName}</h3>

      <div className='bg-light p-3 m-4 rounded'>
        <p>
          Помните, Вы можете деактивировать запись. Вы все еще сможете видеть
          деактивированную запись в личном кабинете.{' '}
        </p>
        <p> Чтобы заново активировать запись - поставьте галочку</p>
      </div>
      <h4 className='mb-4'>Созданные Вами записи:</h4>
      <ul>
        {note.length > 0
          ? note.map((element, index) => (
              <SingleNote element={element} key={index} />
            ))
          : null}
      </ul>
    </div>
  );
}
