import { useEffect, useRef, useState } from 'react';
import { BsFillRecordFill, BsSquareFill } from 'react-icons/bs';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';

const Play = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [curAudioURL, setCurAudioURL] = useState('');
  const [audioList, setAudioList] = useState();

  useEffect(() => {
    (async () => {
      const { items } = await listAll(ref(storage));
      setAudioList(items.reverse());
    })();
  }, []);

  return (
    <Container>
      <ul>{audioList && audioList.map(storageRef => <li key={storageRef.name}>{storageRef.name}</li>)}</ul>
    </Container>
  );
};

const Container = styled.div``;

export default Play;
