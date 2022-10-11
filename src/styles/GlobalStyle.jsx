import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  input {
    &:focus {
      outline: none;
    }
  }

  body { 
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #3eacac;
    color: ${({ theme }) => theme.recordingColor};
  }
`;

export default GlobalStyle;
