import React, { useCallback, useState, useRef } from 'react';
import Webcam from 'react-webcam';

const RecordingVideo = (props) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(
    (event) => {
      event.preventDefault();
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm'
      });
      mediaRecorderRef.current.addEventListener(
        'dataavailable',
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    },
    [webcamRef, setCapturing, mediaRecorderRef]
  );

  const handleStopCaptureClick = useCallback(
    (event) => {
      event.preventDefault();
      mediaRecorderRef.current.stop();
      setCapturing(false);
    },
    [mediaRecorderRef, webcamRef, setCapturing]
  );

  const handleDownload = useCallback(
    (event) => {
      event.preventDefault();
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: 'video/webm'
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
    },
    [recordedChunks]
  );

  return (
    <div>
      {capturing ? (
        <div>
          <button
            className='btn btn-success mb-3'
            onClick={handleStopCaptureClick}
          >
            Stop video record
          </button>
        </div>
      ) : (
          <div>
            <button className={'btn btn-info mb-3'} onClick={() => props.data()}>
              Cancel video record
          </button>
            <div>
              <button
                className='btn btn-success mb-3'
                onClick={handleStartCaptureClick}
              >
                Start video record
            </button>
            </div>
          </div>
        )}
      {recordedChunks.length > 0 && (
        <div>
          <button className='btn btn-success mb-3' onClick={handleDownload}>
            Save
          </button>
        </div>
      )}
      <Webcam audio={true} ref={webcamRef} mirrored={true} />
    </div>
  );
};

export default RecordingVideo;
