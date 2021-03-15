import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import photo from '../photo.png';

const RecordingPhoto = () => {
  const [startPhoto, setStartPhoto] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const webcamRef = useRef(null);

  const buttonStart = {
    styleStart: 'btn btn-success mb-3',
    labelStart: 'Start photoshoot'
  };

  const buttonEnd = {
    styleEnd: 'btn btn-info mb-3',
    labelEnd: 'Stop photoshoot'
  };

  const [buttonPhotoStart, setButtonPhotoStart] = useState(
    buttonStart.labelStart
  );
  const [buttonStyle, setButtonStyle] = useState(buttonStart.styleStart);

  const startPhotoHandler = (event) => {
    event.preventDefault();
    if (startPhoto === false) {
      setCapturing((prev) => !prev);
      setStartPhoto(true);
      setButtonPhotoStart(buttonEnd.labelEnd);
      setButtonStyle(buttonEnd.styleEnd);
    }
    if (startPhoto === true) {
      setStartPhoto(false);
      setCapturing((prev) => !prev);
      setButtonPhotoStart(buttonStart.labelStart);
      setButtonStyle(buttonStart.styleStart);
    }
  };

  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(
    (event) => {
      event.preventDefault();
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);

      const saveImg = imageSrc;
      const a = document.createElement('a');
      a.href = saveImg;
      a.download = 'Time-capsule-photo.jpeg';
      a.click();
    },
    [webcamRef, setImgSrc]
  );

  return (
    <div>
      {capturing ? (
        <button className={buttonStyle} onClick={startPhotoHandler}>
          {buttonPhotoStart}
        </button>
      ) : (
          <div>
            <p>Start photo-camera</p>
            <img
              className='ml-5'
              style={{ width: '100px' }}
              src={photo}
              onClick={startPhotoHandler}
            />
          </div>
        )}
      {capturing ? (
        <div>
          <div>
            <button onClick={capture} className={'btn btn-success mb-3'}>
              Make photo
            </button>
          </div>
          {imgSrc && <img src={imgSrc} className={'mb-3'} />}
        </div>
      ) : null}

      <Webcam
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        videoConstraints={startPhoto}
        mirrored={true}
        screenshotQuality={1}
      />
    </div>
  );
};

export default RecordingPhoto;
