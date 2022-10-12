import { useEffect, useRef, useState } from 'react';
import { AiFillPlayCircle, AiOutlineArrowLeft } from 'react-icons/ai';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';
import PlayList from '../../components/play/PlayList';
import { useNavigate } from 'react-router-dom';

const Play = () => {
  const navigate = useNavigate();

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
      <Title>
        <AiOutlineArrowLeft size={20} onClick={() => navigate('/')} />
        <h2>재생목록</h2>
      </Title>
      <ul>{audioList && audioList.map(storageRef => <PlayList key={storageRef.name} storageRef={storageRef} />)}</ul>
      <PlayBar>
        <AiFillPlayCircle size={40} />
      </PlayBar>
    </Container>
  );
};

const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 10;
  width: 100%;
  max-width: 600px;
  background-color: #3eacac;
  border-bottom: 1px solid white;
`;

const Container = styled.div`
  padding-top: 20px;

  ul {
    margin-top: 40px;
  }
`;

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
  padding: 10px;
  border-top: 1px solid white;
  background-color: #3eacac;
`;

export default Play;
