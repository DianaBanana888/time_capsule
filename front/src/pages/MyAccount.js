import React from 'react';

import { useSelector } from 'react-redux';
import SingleNote from '../components/SingleNote';

export default function MyAccount() {
  const { userName, note } = useSelector((state) => state);
  return (
    <div>
      <h3>Hello, {userName}</h3>

      <div className='bg-light p-3 m-4 rounded'>
        <p>
          Remember, you can deactivate the recording. You can still see
           deactivated entry in the personal account.{' '}
        </p>
        <p> To reactivate the recording - check the box</p>
      </div>
      <h4 className='mb-4'>The notes you created:</h4>
      <ul>
        {note && note.length > 0
          ? note.map((element, index) => (
            <SingleNote element={element} key={index} />
          ))
          : null}
      </ul>
    </div>
  );
}
