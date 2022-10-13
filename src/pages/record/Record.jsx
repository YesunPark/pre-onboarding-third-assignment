import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillRecordFill, BsSquareFill, BsList } from 'react-icons/bs';
import { ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';
import RecordingModal from '../../components/record/RecordingModal';
import PlayBtn from '../../components/record/PlayBtn';
import DownloadBtn from '../../components/record/DownloadBtn';

const Record = () => {
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef();
  const audioArray = useRef([]);

  const [timeMaxValue, setTimeMaxValue] = useState(20);
  const [timer, setTimer] = useState(0);
  const timerId = useRef(0);

  const toggleRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);

        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

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
            const seconds = now.getSeconds();

            const storageRef = ref(storage, `${year}-${month}-${date}-${hours}-${minute}-${seconds}.webm`);
            setIsSaving(true);
            await uploadBytes(storageRef, blob);
            setIsSaving(false);
          } catch (error) {
            console.log(error);
          }
        };

        recorder.start();
        mediaRecorderRef.current = recorder;

        timerId.current = setInterval(() => setTimer(prev => prev + 1), 1000);
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

  return (
    <>
      <StyledRecord>
        <ListButton onClick={() => navigate('/play')} size={30} />
        <TimeParagraph>
          최대 녹음 시간 <span> {timeMaxValue}s</span>
        </TimeParagraph>
        <input type='range' onChange={({ target: { value } }) => setTimeMaxValue(Number(value))} max={100} min={3} defaultValue={20} disabled={isRecording} />
        <Description>
          동그라미를 움직여서
          <br /> 최대 녹음시간을 설정할 수 있어요!
        </Description>
        <TimeParagraph>
          현재 녹음 시간 <span>{timer}s</span>
        </TimeParagraph>
      </StyledRecord>
      <ButtonWrapper>
        <StartButton isRecording={isRecording} onClick={toggleRecord} disabled={isPlaying}>
          {audioURL && !isSaving && <span>다시 녹음</span>}
          {isRecording ? <BsSquareFill size={30} /> : <BsFillRecordFill size={30} />}
        </StartButton>
        {!isRecording && (
          <>
            <PlayBtn isPlaying={isPlaying} setIsPlaying={setIsPlaying} isSaving={isSaving} audioURL={audioURL} />
            {!isSaving && !isPlaying && <DownloadBtn audioURL={audioURL} />}
          </>
        )}
      </ButtonWrapper>
      {isRecording && <RecordingModal />}
    </>
  );
};

const StyledRecord = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  input {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const ListButton = styled(BsList)`
  padding: 0;
  border: none;
  background-color: transparent;
  color: white;
  margin-bottom: 40px;
  cursor: pointer;
`;

const TimeParagraph = styled.p`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  width: 100%;
  word-break: keep-all;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.mainColor};
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export const StartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50px;
  margin: 20px auto 0px;
  border: none;
  border-radius: 10px;
  color: ${({ theme, isRecording }) => (isRecording ? 'black' : theme.recordingColor)};
  cursor: pointer;
`;

export default Record;
