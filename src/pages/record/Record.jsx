import { useState } from 'react';
import styled from 'styled-components';
import RecordingMordal from '../../components/record/RecordingMordal';

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const toggleRecord = () => {
    setIsRecording(prev => !prev);
  };
  return (
    <Wrapper>
      <StartButton isRecording={isRecording} onClick={toggleRecord}>
        {isRecording ? `Stop Recording` : `Start Recording`}
      </StartButton>
      {isRecording && <RecordingMordal />}
    </Wrapper>
  );
};
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
