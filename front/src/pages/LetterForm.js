import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewLetterAC } from '../store/actions';
import FileUpload from '../components/FileUpload/FileUpload';

// import MaterialUIPickers from '../components/DateTimePicker';

export default function LetterForm() {
  const [showUpload, setShowupload] = useState(false);
  const [values, setValues] = useState({
    textAreaValue: '',
    photo: '',
    targetEmail: '',
    deliveryDate: ''
  });

  const dispatch = useDispatch();
  const { idUser } = useSelector((state) => state);

  const onSubmitHandler = async () => {
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
      photo: '',
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

  const showUploadHandler = () => {
    setShowupload(!showUpload);
  };

  return (
    <div>
      <h4 className='mb-4'>Ваше письмо в будущее</h4>
      <form action='' onSubmit={() => onSubmitHandler()}>
        <div className='form-group'>
          <textarea
            className='form-control'
            placeholder='Дорогой Будущий я...'
            rows='10'
            name='textAreaValue'
            value={values.textAreaValue}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        {!showUpload ? (
          <button
            onClick={() => showUploadHandler()}
            className='btn btn-primary mb-3'
          >
            Добавить фото/видео
          </button>
        ) : (
            <FileUpload testFunction={testFunction} />
          )}
        <div className='form-group row ml-1'>
          <h5 className='mr-2'>Email для доставки письма:</h5>
          <input
            className='form-control form-control-label'
            type="text"
            name="targetEmail"
            required
            value={values.targetEmail}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className='form-group row ml-1'>
          <h5 className='mr-2'>Выбрать дату:</h5>
          <input
            type="datetime-local"
            name="deliveryDate"
            required
            value={values.deliveryDate}
            onChange={onChangeHandler}
          ></input>
        </div>
        {/* <MaterialUIPickers /> */}
        <div>
          <input
            defaultValue='Отправить'
            type='submit'
            className='btn btn-primary'
          ></input>
        </div>
      </form>
    </div>
  );
}
