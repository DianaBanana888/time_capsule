import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Выберите файл для загрузки');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
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
      setUploadedFile({ fileName, filePath });
      setMessage('Загрузка файла произошла успешно');
      setFile('');
      setFilename('Выберите файл для загрузки');
    } catch (error) {
      if (error.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      {message && <Message msg={message} />}
      <form onSubmit={onSubmit}>
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
          type="submit"
          value="Загрузить"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: '100%' }}
              src={uploadedFile.filePath}
              alt={uploadedFile.fileName}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;
