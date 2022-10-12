import { useEffect, useRef, useState } from 'react';
import { BsFillRecordFill, BsSquareFill } from 'react-icons/bs';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';

const Play = () => {
  const [audioURL, setAudioURL] = useState('');

  return <audio src={audioURL} />;
};

const PlayContainer = styled.div``;

export default Play;
