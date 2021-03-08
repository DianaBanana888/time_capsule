import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewLetterAC } from '../store/actions';
import FileUpload from '../components/FileUpload/FileUpload';

export default function LetterForm() {
  const [values, setValues] = useState({
    textAreaValue: '',
    photo: '',
    targetEmail: '',
    deliveryDate: ''
  });

  const dispatch = useDispatch();
  const { idUser } = useSelector((state) => state);

  const onSubmitHandler = async () => {
    if (values.textAreaValue && values.targetEmail && values.deliveryDate) {
      console.log(values);
    } else alert('Введите данные');

    const res = await fetch('/note/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values, idUser })
    });
    const result = await res.json();

    dispatch(saveNewLetterAC(result));

    setValues({
      textAreaValue: '',
      targetEmail: '',
      deliveryDate: ''
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const testFunction = (param) => {
    setValues({ ...values, photo: param });
  };

  return (
    <div id="letter-wrapper">
      <h4>Ваше письмо в будущее</h4>
      <form id="new letter" action="" onSubmit={() => onSubmitHandler()}>
        <div>
          <textarea
            placeholder="Дорогой Будущий я..."
            rows="10"
            cols="45"
            name="textAreaValue"
            value={values.textAreaValue}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <FileUpload testFunction={testFunction} />
        <div>
          <h5>Email для доставки письма:</h5>
          <input
            type="text"
            name="targetEmail"
            value={values.targetEmail}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div>
          <h5>Выбрать дату:</h5>
          <input
            type="datetime-local"
            name="deliveryDate"
            value={values.deliveryDate}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div>
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>
  );
}
