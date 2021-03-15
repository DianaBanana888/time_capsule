import React from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HistoryIcon from '@material-ui/icons/History';
import InputIcon from '@material-ui/icons/Input';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import main from './main.jpg';

export default function Home() {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${main})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          height: '720px',
          opacity: 0.8
        }}
      >
        <h1 className='text-center p-5'>Write a letter to the future!</h1>

        <div className='ml-5 pt-1'>
          <p>
            <AssignmentTurnedInIcon /> A letter to the future - a message sent
             to yourself, your children, heirs, friends or acquaintances.
          </p>
          <p>
            <HistoryIcon /> This way of transmitting information can also be
              known it as the Time Capsule.
          </p>
          <p>
            <InputIcon /> Letters to the future are usually placed in some kind of strong
             shell, for example, a metal capsule that is hidden in
             a safe place.
          </p>
          <p>
            <ContactMailIcon /> Write a message, indicate the address, and in the specified
              day it will come to the addressee's e-mail.
          </p>
        </div>
      </div>
    </div>
  );
}
