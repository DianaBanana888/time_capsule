import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';
import RecordingVideo from '../Webcam/RecordingVideo';
import RecordingPhoto from '../Webcam/RecordingPhoto';

const FileUpload = ({ testFunction }) => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Выберите файл для загрузки');
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = (e) => {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    };

    const onUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('http://localhost:5000/note/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total),
              ),
            );
            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          },
        });
        const { fileName, filePath } = res.data;
        setMessage('Загрузка файла произошла успешно');
        setFile('');
        setFilename('Выберите файл для загрузки либо запишите видео');
        testFunction(filePath);
      } catch (error) {
        if (error.response.status === 500) {
          setMessage('There was a problem with the server');
        } else {
          setMessage(error.response.data.message);
        }
      }
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
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />
        <input
          onClick={() => onUpload()}
          defaultValue="Загрузить файл"
          className="btn btn-primary btn-block mt-4"
        />
      </>
    );
  }
;

export default FileUpload;
