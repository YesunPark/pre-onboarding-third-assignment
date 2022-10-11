import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Record from './pages/record/Record';
import Play from './pages/play/Play';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const App = () => {
  const [audioURL, setAudioURL] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Record audioURL={audioURL} setAudioURL={setAudioURL} />} />
        <Route path='/play' element={<Play audioURL={audioURL} />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
