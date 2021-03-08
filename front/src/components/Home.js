import React from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HistoryIcon from '@material-ui/icons/History';
import InputIcon from '@material-ui/icons/Input';
import ContactMailIcon from '@material-ui/icons/ContactMail';
export default function Home() {
  const urlpic =
    'https://checkinsea.global/assets/image-cache/29386500-761285150747839-91372160752287744-o.33bf7ce6.jpg';
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${urlpic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          height: '720px',
          opacity: 0.8,
        }}
      >
        <h1 className='text-center p-5'>Напиши письмо в будущее!</h1>

        <div className='ml-5 pt-1'>
          <p>
            <AssignmentTurnedInIcon /> Письмо в будущее — послание, отправляемое
            самому себе, своим детям, наследникам, друзьям или знакомым.
          </p>
          <p>
            <HistoryIcon /> Такой способ передавать информацию также может быть
            вам известен под названием "Капсула времени".
          </p>
          <p>
            <InputIcon /> Письма в будущее обычно помещаются в какую-то прочную
            оболочку, например, металлическую капсулу, которая прячется в
            надёжное место.
          </p>
          <p>
            <ContactMailIcon /> Напишите послание, укажите адрес, и в указанный
            Вами день оно придет на электронную почту адресата.
          </p>
        </div>
      </div>
    </div>
  );
}
