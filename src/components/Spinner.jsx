import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Spinner = () => {
  return (
    <StyledSpinner>
      <AiOutlineLoading3Quarters size={30} />
    </StyledSpinner>
  );
};

const spin = keyframes`
  0% {
    rotate: 0deg;
  }

  100% {
    rotate: 360deg;
  }
`;

const StyledSpinner = styled.div`
  svg {
    animation: ${spin} infinite 0.4s;
  }
`;

export default Spinner;
