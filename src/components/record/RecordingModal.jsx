import styled, { keyframes } from 'styled-components';

const RecordingMordal = () => {
  return (
    <ModalContainer>
      <span>On Air</span>
      <RedDot />
    </ModalContainer>
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
const ModalContainer = styled.div`
  width: 50%;
  height: 50px;
  background: black;
  padding: 20px 40px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const RedDot = styled.div`
  width: 15px;
  height: 15px;
  aspect-ratio: 1 / 1;
  background: red;
  border-radius: 50%;
  animation: ${Blinking} 0.8s infinite alternate;
`;

export default RecordingMordal;
