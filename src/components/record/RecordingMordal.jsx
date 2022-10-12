import styled, { keyframes } from 'styled-components';

const RecordingMordal = () => {
  return (
    <MordalWrapper>
      <span>On Air</span>
      <RedDot />
    </MordalWrapper>
  );
};

const Blinking = keyframes`
  0% {
    background : transparent;
  }
  100% {
    background : red;
  }

`;
const MordalWrapper = styled.div`
  position: absolute;
  top: 10%;
  width: 50%;
  height: 50px;
  background: black;
  padding: 20px 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const RedDot = styled.div`
  width: 15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  animation: ${Blinking} 0.8s infinite alternate;
`;

export default RecordingMordal;
