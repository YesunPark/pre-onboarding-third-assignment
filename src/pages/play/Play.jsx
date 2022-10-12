import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsStopCircle, BsPlayCircle } from 'react-icons/bs';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';
import PlayList from '../../components/play/PlayList';
import { useNavigate } from 'react-router-dom';

const Play = () => {
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [curAudioURL, setCurAudioURL] = useState('');
  const [curAudioName, setCurAudioName] = useState('');
  const [audioList, setAudioList] = useState();
  const audioElement = useRef(null);

  const [time, setTime] = useState(0);
  const timerId = useRef(0);

  useEffect(() => {
    (async () => {
      const { items } = await listAll(ref(storage));
      setAudioList(items.reverse());
    })();
  }, []);

  const selectHandler = async storageRef => {
    setIsLoading(true);
    setCurAudioName(storageRef.name);

    try {
      const url = await getDownloadURL(storageRef);
      setCurAudioURL(url);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const playHandler = useCallback(() => {
    if (curAudioURL) {
      audioElement.current.play();
      setIsPlaying(true);

      clearInterval(timerId.current);
      timerId.current = setInterval(() => setTime(prev => prev + 1), 1000);
    }
  }, [curAudioURL]);

  const stopHandler = useCallback(() => {
    if (curAudioURL) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
      setIsPlaying(false);
      clearInterval(timerId.current);
      setTime(0);
    }
  }, [curAudioURL]);

  useEffect(() => {
    playHandler();
    setTime(0);
  }, [curAudioURL]);

  const downloadHandler = () => {
    const link = document.createElement('a');
    link.href = curAudioURL;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Container>
      <Title>
        <div className='container'>
          <AiOutlineArrowLeft size={20} onClick={() => navigate('/')} />
          <h2>재생목록</h2>
        </div>
      </Title>
      <ul>
        {audioList &&
          audioList.map(storageRef => (
            <PlayList //
              key={storageRef.name}
              storageRef={storageRef}
              selectHandler={selectHandler}
              curAudioName={curAudioName}
              downloadHandler={downloadHandler}
            />
          ))}
      </ul>
      <PlayBar>
        <div className='container'>
          <audio src={curAudioURL} ref={audioElement} onEnded={stopHandler} />
          <h3>{curAudioName}</h3>
          <p>{time}s</p>
          {isPlaying ? <BsStopCircle onClick={stopHandler} size={40} /> : <BsPlayCircle onClick={playHandler} size={40} />}
        </div>
      </PlayBar>
    </Container>
  );
};

const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 10;
  width: 100%;
  background-color: #3eacac;
  border-bottom: 1px solid white;

  div.container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 30;

  ul {
    padding-top: 61px;
  }
`;

const PlayBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  border-top: 1px solid white;
  background-color: #3eacac;

  div.container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  h3 {
    width: 60%;
  }

  p {
    word-break: keep-all;
  }
`;

export default Play;
