import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const RecordingPhoto = () => {
  const [startPhoto, setStartPhoto] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const webcamRef = useRef(null);

  const buttonStart = {
    styleStart: 'btn btn-success',
    labelStart: 'Включить режим фотоснимков',
  };

  const buttonEnd = {
    styleEnd: 'btn btn-info',
    labelEnd: 'Отключить режим фотоснимков',
  };

  const [buttonPhotoStart, setButtonPhotoStart] = useState(buttonStart.labelStart);
  const [buttonStyle, setButtonStyle] = useState(buttonStart.styleStart);

  const startPhotoHandler = (event) => {
    event.preventDefault();
    if (startPhoto === false) {
      setCapturing(prev => !prev);
      setStartPhoto(true);
      setButtonPhotoStart(buttonEnd.labelEnd);
      setButtonStyle(buttonEnd.styleEnd);
    }
    if (startPhoto === true) {
      setStartPhoto(false);
      setCapturing(prev => !prev);
      setButtonPhotoStart(buttonStart.labelStart);
      setButtonStyle(buttonStart.styleStart);
    }
  };

  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback((event) => {
    event.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    const saveImg = imageSrc;
    const a = document.createElement('a');
    a.href = saveImg;
    a.download = 'Time-capsule-photo.jpeg';
    a.click();

  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <div>
        <button className={buttonStyle} onClick={startPhotoHandler}>{buttonPhotoStart}</button>
      </div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={startPhoto}
        mirrored={true}
        screenshotQuality={1}
      />
      {capturing ?
        <>
          <button onClick={capture} className={'btn btn-success'}>Сделать фото</button>
          {imgSrc && (<img src={imgSrc} />)}
        </>
        :
        null
      }

    </div>
  );
};

export default RecordingPhoto;
