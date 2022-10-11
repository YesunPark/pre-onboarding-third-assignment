import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body { 
    max-width: 600px;
    margin: auto;
    background-color: #3eacac;
    color: ${({ theme }) => theme.recordingColor};
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    text-decoration: none;
  }

  input {
    &:focus {
      outline: none;
    }
  }


`;

export default GlobalStyle;
