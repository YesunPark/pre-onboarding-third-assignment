import { useEffect, useRef, useState } from 'react';
import { BsFillRecordFill, BsSquareFill } from 'react-icons/bs';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';
import PlayList from '../../components/play/PlayList';

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
      <ul>{audioList && audioList.map(storageRef => <PlayList key={storageRef.name} storageRef={storageRef} />)}</ul>
      <PlayBar>플레이바</PlayBar>
    </Container>
  );
};

const Container = styled.div``;

const PlayBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

export default Play;
