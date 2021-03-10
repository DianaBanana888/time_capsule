import React, { useCallback, useState, useRef } from 'react';
import Webcam from 'react-webcam';

const RecordingVideo = (props) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCaptureClick = useCallback((event) => {
    event.preventDefault();
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStopCaptureClick = useCallback((event) => {
    event.preventDefault();
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback((event) => {
    event.preventDefault();
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'Time-capsule-video.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
      <Webcam
        audio={true}
        ref={webcamRef}
        mirrored={true}
      />
      {capturing ? (
        <button className="btn btn-success" onClick={handleStopCaptureClick}>Остановить видеозапись</button>
      ) : (
        <>
          <button className="btn btn-info" onClick={handleStartCaptureClick}>Начать видеозапись</button>
          <button className={'btn btn-success'} onClick={() => props.data()}>Отключить режим записи видео</button>
        </>
      )}
      {recordedChunks.length > 0 && (
        <button className="btn btn-success" onClick={handleDownload}>Сохранить</button>
      )}
    </>
  );
};

export default RecordingVideo;
