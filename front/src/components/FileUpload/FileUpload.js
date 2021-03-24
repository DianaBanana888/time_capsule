import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Message from './Message';
import Progress from './Progress';
import RecordingVideo from '../Webcam/RecordingVideo';
import RecordingPhoto from '../Webcam/RecordingPhoto';
import video from '../video.png';

const FileUpload = ({ testFunction, hideFunction }) => {
  const { note } = useSelector((state) => state);
  const [file, setFile] = useState('');
  const [originalFileName, setOriginalFileName] = useState(
    'Choose a file to upload'
  );
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

  useEffect(() => {
    setPhotoArray([]);
    setMessage('');
  }, [note]);

  const onUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        '/note/upload',
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
      setMessage('Uploaded successfully');
      setFile('');
      setOriginalFileName('Choose a file to upload');
    } catch (error) {
      if (error.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(error.response.data.message);
      }
    }
  };

  const onDeleteFoto = (el) => {
    fetch('/note/downdate', {
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
    setRecordMyVideo((prev) => !prev);
  };

  return (
    <div>
      <button onClick={() => hideFunction()} className='btn btn-primary mb-3'>
        Выйти из меню фото/видео
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {recordMyVideo ? (
          <RecordingVideo data={RecordingVideoHandler} />
        ) : (
            <div>
              <p>Start video record</p>
              <img
                className='ml-5'
                style={{ width: '110px' }}
                src={video}
                onClick={RecordingVideoHandler}
              />
            </div>
          )}
        <div>
          <RecordingPhoto />
        </div>
      </div>

      <div>
        <div className='p-4 mb-3 bg-light rounded'>
          {message && <Message msg={message} />}
          <div className='custom-file mb-4'>
            <input
              type='file'
              id='customFile'
              className='custom-file-input'
              onChange={onChange}
            />
            <label htmlFor='customFile' className='custom-file-label'>
              {originalFileName}
            </label>
          </div>

          <Progress percentage={uploadPercentage} />
          <input
            onClick={() => onUpload()}
            defaultValue='Upload'
            className='btn btn-primary mt-3 mb-3'
          />
        </div>
        {photoArray.length > 0
          ? photoArray.map((el) => (
            <div key={el.filePath} className='container h-100 '>
              <hr />
              <div className='row align-items-center h-100'>
                <div className='col mx-auto'>
                  <img
                    className='m-2 '
                    style={{ width: '25%' }}
                    src={el.filePath}
                    alt={el.originalFileName}
                  />
                </div>
                <div className='col mx-auto mr-4'>{el.originalFileName}</div>
                <div className='col'>
                  <button
                    className='btn btn-primary offset-sm-8'
                    onClick={() => onDeleteFoto(el)}
                  >
                    Delete
                    </button>
                </div>
                <hr />
              </div>
            </div>
          ))
          : null}
      </div>
    </div>
  );
};

export default FileUpload;
