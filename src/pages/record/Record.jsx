import { useEffect, useRef, useState } from 'react';
import { BsFillRecordFill, BsSquareFill } from 'react-icons/bs';
import { ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';
import RecordingMordal from '../../components/record/RecordingMordal';

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef();
  const audioArray = useRef([]);
  const audioElement = useRef(null);

  const [timeMaxValue, setTimeMaxValue] = useState(20);
  const [timer, setTimer] = useState(0);
  const timerId = useRef(0);

  const toggleRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);

        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = ({ data }) => audioArray.current.push(data);

        recorder.onstop = async () => {
          const blob = new Blob(audioArray.current);
          audioArray.current.splice(0);
          clearInterval(timerId.current);
          setTimer(0);

          setAudioURL(window.URL.createObjectURL(blob));
          setIsRecording(false);

          try {
            const now = new Date();

            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const date = now.getDate();
            const hours = now.getHours();
            const minute = now.getMinutes();

            const storageRef = ref(storage, `${year}-${month}-${date}-${hours}-${minute}.webm`);
            setIsSaving(true);
            await uploadBytes(storageRef, blob);
            setIsSaving(false);
          } catch (error) {
            console.log(error);
          }
        };

        recorder.start();
        mediaRecorderRef.current = recorder;

        timerId.current = setInterval(() => {
          setTimer(prev => prev + 1);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (mediaRecorderRef.current && timer === timeMaxValue) {
      mediaRecorderRef.current.stop();
    }
  }, [timer]);

  const toggleAudio = () => {
    if (audioURL) {
      if (!isPlaying) {
        setIsPlaying(true);
        audioElement.current.play();
      } else {
        audioElement.current.pause();
        audioElement.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <StyledRecord>
        <p>최대 녹음 시간 {timeMaxValue}s</p>
        <p>현재 녹음 시간 {timer}s</p>
        <input
          type='range' //
          onChange={({ target: { value } }) => setTimeMaxValue(Number(value))}
          max={100}
          min={3}
          defaultValue={20}
          disabled={isRecording}
        />
        <audio ref={audioElement} src={audioURL} onEnded={() => setIsPlaying(false)} />
        <div className='buttonContainer'>
          <button onClick={toggleAudio}>재생</button>
        </div>
        <p>{isPlaying ? '멈춤' : '재생'}</p>
        {isSaving && <p>저장중...</p>}
      </StyledRecord>
      <Wrapper>
        <StartButton isRecording={isRecording} onClick={toggleRecord} disabled={isPlaying}>
          {isRecording ? `Stop Recording` : `Start Recording`}
        </StartButton>
        {isRecording && <RecordingMordal />}
      </Wrapper>
    </>
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

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StartButton = styled.button`
  font-weight: 600;
  width: 300px;
  font-size: 18px;
  color: red;
  background: black;
  padding: 20px 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50%;
  transform: ${({ isRecording }) => (isRecording ? `translateY(300px)` : `translateY(50%)`)};
  transition: transform 0.5s ease-in-out;
`;

export default Record;
