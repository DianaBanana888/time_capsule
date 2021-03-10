import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeMindAC, deleteAC, updateTextAC
} from '../store/actions';

export default function SingleNote({ element }) {
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState('');
  const dispatch = useDispatch();
  const dateFormat = (d) => new Date(d).toLocaleString();

  const onChangeMind = (id, wantSending) => {
    fetch('http://localhost:5000/singleNoteAction/changeMind', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, wantSending })
    });
    dispatch(changeMindAC(id, wantSending));
  };

  const onDeleteSingleNote = (id) => {
    fetch('http://localhost:5000/singleNoteAction/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    dispatch(deleteAC(id));
  };

  const changingHandler = ({ target: { value } }) => {
    setSave(value);
  };

  const saveEditItem = (id, text) => {
    fetch('http://localhost:5000/singleNoteAction/upd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, text })
    });
    dispatch(updateTextAC(id, text));
  };

  return (
    <div>
      <li
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        <div>
          <input
            onClick={() => onChangeMind(element._id, element.wantSending)}
            type='checkbox'
            id={element._id}
            name='checkbox'
            value={element.wantSending}
            defaultChecked={element.wantSending}
          />
        </div>
        <div
          style={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
        >
          <p>Запись, созданая {dateFormat(element.creationDate)},
        для адресата {element.receivers}</p>
          <div>
            {edit ? (
              <input type='text' defaultValue={element.text} onChange={changingHandler} />
            ) : (<label >
              {element.text}
            </label>)}
            {edit ? (
              <button
                className="btn btn-outline-success"
                onClick={() => { setEdit(false); saveEditItem(element._id, save); }}>save text</button>
            ) : (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setEdit(true)}>edit text</button>
              )}
          </div>
          <p style={{ fontStyle: 'italic' }}>Медафайлы: {element.photo.length}шт</p>
          <p>Отправка запланирована на {dateFormat(element.deliveryDate)} </p>
        </div>
        <div>
          <button
            className="btn btn-outline-dark"
            onClick={() => onDeleteSingleNote(element._id)}>delete</button>
        </div>
      </li>
      <br />
    </div >
  );
}
