import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNewLetterAC } from "../store/actions";
import FileUpload from "../components/FileUpload/FileUpload";
import MaterialUIPickers from "../components/DateTimePicker";
export default function LetterForm() {
  const [showUpload, setShowupload] = useState(false);
  const [values, setValues] = useState({
    textAreaValue: '',
    photo: '',
    targetEmail: '',
    deliveryDate: '',
    time: ''
  });

  const dispatch = useDispatch();
  const { idUser } = useSelector((state) => state);

  const onSubmitHandler = async () => {
    if (values.textAreaValue && values.targetEmail && values.deliveryDate) {
      console.log(values);
    } else alert("Введите данные");

    const res = await fetch("/note/save", {
      method: "POST",
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
      deliveryDate: '',
      time: ''
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
      <h4 className="mb-4">Ваше письмо в будущее</h4>
      <form action="" onSubmit={() => onSubmitHandler()}>
        <div class="form-group">
          <textarea
            class="form-control"
            placeholder="Дорогой Будущий я..."
            rows="10"
            name="textAreaValue"
            value={values.textAreaValue}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        {!showUpload ? (
          <button
            onClick={() => showUploadHandler()}
            className="btn btn-primary mb-3"
          >
            Добавить фото/видео
          </button>
        ) : (
          <FileUpload testFunction={testFunction} />
        )}
        <div class="form-group row ml-1">
          <h5 class="mr-2">Email для доставки письма:</h5>
          <input
            class="form-control form-control-label"
            type="text"
            name="targetEmail"
            value={values.targetEmail}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div class="form-group row ml-1">
          <h5 class="mr-2">Доставить через:</h5>
          <a
            class="badge badge-primary mr-3 d-inline-flex align-items-center justify-content-start p-2"
            href="#"
          >
            1 год{" "}
          </a>
          &nbsp;
          <a
            class="badge badge-primary mr-3 d-inline-flex align-items-center justify-content-start p-2"
            href="#"
          >
            2 года{" "}
          </a>
          &nbsp;
          <a
            class="badge badge-primary mr-3 d-inline-flex align-items-center justify-content-start p-2"
            href="#"
          >
            5 лет{" "}
          </a>{" "}
          &nbsp;
          <h5 class="mr-2">или выбрать дату:</h5>
          <input
            type="date"
            name="deliveryDate"
            value={values.deliveryDate}
            min="2020-03-10"
            max="2040-12-31"
            onChange={onChangeHandler}
          ></input>
          <h5 class="mr-2"> &nbsp; и время: </h5>
          <input
            type="time"
            name="time"
            value={values.time}
            onChange={onChangeHandler}
          ></input>
        </div>

        <MaterialUIPickers />
        <div>
          <input
            defaultValue="Отправить"
            type="submit"
            className="btn btn-primary"
          ></input>
        </div>
      </form>
    </div>
  );
}
