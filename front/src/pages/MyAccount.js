import React from 'react';

import { useSelector } from 'react-redux';
import SingleNote from '../components/SingleNote';

export default function MyAccount() {
  const {
    userName, note
  } = useSelector((state) => state);
  return (
    <div>
      <h3>Добрый день, {userName}</h3>
      <br />
      <p>Вы можете ознакомиться с создаными записями:</p>
      <br />
      <p>Помните, Вы можете деактивировать запись. Вы все еще сможете видеть деактивированную запись в личном кабинете. </p>
      <p> Чтобы заново активировать запись - поставьте галочку</p>
      <ul>
        {note.map((element, index) => (
          <SingleNote element={element} key={index} />
        ))}
      </ul>
    </div>
  );
}
