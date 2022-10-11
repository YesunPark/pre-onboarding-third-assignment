import { useRef, useState } from 'react';
import { BsPlayFill, BsSquareFill } from 'react-icons/bs';
import styled from 'styled-components';

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef();
  const audioArray = useRef([]);
  const [audioURL, setAudioURL] = useState('');
  const audioElement = useRef(null);

  const [timeMaxValue, setTimeMaxValue] = useState(0);
  const debounce = useRef(0);

  const toggleRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);

        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = ({ data }) => audioArray.current.push(data);

        recorder.onstop = () => {
          const blob = new Blob(audioArray.current);

          audioArray.current.splice(0);

          setAudioURL(window.URL.createObjectURL(blob));
          setIsRecording(false);
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
      } catch (error) {
        console.log(error);
      }
    } else {
      mediaRecorderRef.current.stop();
    }
  };

  const startAudio = () => {
    if (audioURL) {
      setIsPlaying(true);
      audioElement.current.play();
    }
  };

  const changeHandler = ({ target: { value } }) => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => setTimeMaxValue(value), 300);
  };

  return (
    <StyledRecord>
      <p>최대 녹음 시간 {timeMaxValue}s</p>
      <input type='range' onChange={changeHandler} max={100} min={10} />
      <audio ref={audioElement} src={audioURL} onEnded={() => setIsPlaying(false)} />
      <div className='buttonContainer'>
        <button onClick={toggleRecord}>{isRecording ? <BsSquareFill /> : <BsPlayFill />}</button>
        <button onClick={startAudio}>재생</button>
      </div>
      <p>{isPlaying ? '재생중입니다' : '재생할까요'}</p>
    </StyledRecord>
  );
};

const StyledRecord = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  div.buttonContainer {
    display: flex;
  }

  input {
    width: 100%;
  }
`;

export default Record;
