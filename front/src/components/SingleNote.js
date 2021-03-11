import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeMindAC, deleteAC, updateTextAC } from '../store/actions';

export default function SingleNote({ element }) {
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState('');
  const dispatch = useDispatch();
  const dateFormat = (d) => new Date(d).toLocaleString();

  const onChangeMind = (id, wantSending) => {
    fetch('http://localhost:5000/singleNoteAction/changeMind', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, wantSending }),
    });
    dispatch(changeMindAC(id, wantSending));
  };

  const onDeleteSingleNote = (id) => {
    fetch('http://localhost:5000/singleNoteAction/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, text }),
    });
    dispatch(updateTextAC(id, text));
  };

  return (
    <div>
      <li
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
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
          className='ml-4 mr-4 border rounded p-3'
          style={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'space-evently',
          }}
        >
          <h4>
            Запись, созданая {dateFormat(element.creationDate)}, для адресата{' '}
            {element.receivers}
          </h4>
          <div className='bg-light p-3'>
            <p>Отправка запланирована на {dateFormat(element.deliveryDate)} </p>

            <p style={{ fontStyle: 'italic' }}>
              Медиафайлы: {element.photo.length}шт
            </p>

            <div>
              {edit ? (
                <div className='mb-3'>
                  <input
                    type='text'
                    defaultValue={element.text}
                    onChange={changingHandler}
                  />
                </div>
              ) : (
                <label>{element.text}</label>
              )}
              <div>
                {edit ? (
                  <button
                    className='btn btn-outline-success'
                    onClick={() => {
                      setEdit(false);
                      saveEditItem(element._id, save);
                    }}
                  >
                    Сохранить изменения
                  </button>
                ) : (
                  <button
                    className='btn btn-outline-primary'
                    onClick={() => setEdit(true)}
                  >
                    Редактировать
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            className='btn btn-outline-dark'
            onClick={() => onDeleteSingleNote(element._id)}
          >
            Удалить
          </button>
        </div>
      </li>
      <br />
    </div>
  );
}
