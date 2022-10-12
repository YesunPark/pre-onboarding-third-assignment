import { useEffect, useRef, useState } from 'react';
import { BsFillRecordFill, BsSquareFill } from 'react-icons/bs';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';

const Play = () => {
  const [curAudioURL, setCurAudioURL] = useState('');
  const [audioList, setAudioList] = useState();

  useEffect(() => {
    (async () => {
      const { items } = await listAll(ref(storage));
      console.log(items);
    })();
  });

  return <></>;
};

export default Play;
