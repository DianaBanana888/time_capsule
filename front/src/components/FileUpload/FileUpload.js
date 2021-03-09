import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';
import RecordingVideo from '../Webcam/RecordingVideo';
import RecordingPhoto from '../Webcam/RecordingPhoto';

const FileUpload = ({ testFunction }) => {
  const [file, setFile] = useState('');
  const [originalFileName, setOriginalFileName] = useState('Выберите файл для загрузки');
  const [photoArray, setPhotoArray] = useState([]);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setOriginalFileName(e.target.files[0].name);
  };

  useEffect(() => {
    testFunction(photoArray);
  }, [photoArray]);

    const onUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);

    try {
      const res = await axios.post(
        'http://localhost:5000/note/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 1000);
          }
        }
      );
      const { filePath } = res.data;
      setPhotoArray([...photoArray, { originalFileName, filePath }]);
      setMessage('Загрузка файла произошла успешно');
      setFile('');
      setOriginalFileName('Выберите файл для загрузки');
    } catch (error) {
      if (error.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(error.response.data.message);
      }
    }
  };

  const onDeleteFoto = (el) => {
    fetch('http://localhost:5000/note/downdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(el)
    });
    setPhotoArray(photoArray.filter((item) => item !== el));
  };

  const [recordMyVideo, setRecordMyVideo] = useState(false);
  const RecordingVideoHandler = () => {
    setRecordMyVideo(prev => !prev);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          {
            recordMyVideo ? <RecordingVideo data={RecordingVideoHandler} />
              :
              <button onClick={RecordingVideoHandler} className={'btn btn-success'}>Включить режим записи видео</button>
          }
        </div>
        <div>
          <RecordingPhoto />
        </div>
      </div>
      {message && <Message msg={message} />}
      <div className="custom-file mb-4">
        <input
          type="file"
          id="customFile"
          className="custom-file-input"
          onChange={onChange}
        />
        <label htmlFor="customFile" className="custom-file-label">
          {originalFileName}
        </label>
      </div>

      <Progress percentage={uploadPercentage} />
      <input
        onClick={() => onUpload()}
        defaultValue="Загрузить"
        className="btn btn-primary mt-3 mb-3"
      />
      {photoArray.length > 0
        ? photoArray.map((el) => <div key={el.filePath} className="row mt-5">
          <div className="col-md-6 m-auto">
            <p className="text-center">{el.originalFileName}</p>
            {<img
              style={{ width: '10%' }}
              src={el.filePath}
              alt={el.originalFileName}
            />}
            <button onClick={() => onDeleteFoto(el)}>delete</button>
          </div>
        </div>)
        : null}
    </>
  );
};

export default FileUpload;
