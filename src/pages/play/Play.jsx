import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsStopCircle, BsPlayCircle } from 'react-icons/bs';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import styled from 'styled-components';
import storage from '../../firebase/storage';
import PlayList from '../../components/play/PlayList';
import Spinner from '../../components/Spinner';
import PlaySkeleton from '../../components/play/PlaySkeleton';

const Play = () => {
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);

  const [curAudioURL, setCurAudioURL] = useState('');
  const [curAudioName, setCurAudioName] = useState('');
  const [audioList, setAudioList] = useState();
  const audioElement = useRef(null);

  const [time, setTime] = useState(0);
  const timerId = useRef(0);

  useEffect(() => {
    (async () => {
      setIsListLoading(true);
      try {
        const { items } = await listAll(ref(storage));
        setAudioList(items.reverse());
        setIsListLoading(false);
      } catch (error) {
        console.log(error);
        setIsListLoading(false);
      }
    })();
  }, []);

  const handleSelect = async storageRef => {
    if (storageRef.name !== curAudioName) {
      setIsAudioLoading(true);
      setCurAudioName(storageRef.name);

      try {
        const url = await getDownloadURL(storageRef);
        setCurAudioURL(url);
        setIsAudioLoading(false);
      } catch (error) {
        console.log(error);
        setIsAudioLoading(false);
      }
    }
  };

  const handlePlay = useCallback(() => {
    if (curAudioURL) {
      const playPromise = audioElement.current.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {}).catch(error => {});
      }

      setIsPlaying(true);

      clearInterval(timerId.current);
      timerId.current = setInterval(() => setTime(prev => prev + 1), 1000);
    }
  }, [curAudioURL]);

  const handleStop = useCallback(() => {
    if (curAudioURL) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
      setIsPlaying(false);
      clearInterval(timerId.current);
      setTime(0);
    }
  }, [curAudioURL]);

  useEffect(() => {
    handlePlay();
    setTime(0);
  }, [curAudioURL]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = curAudioURL;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleRemove = async () => {
    setIsListLoading(true);
    const removeRef = ref(storage, curAudioName);

    try {
      await deleteObject(removeRef);
      const { items } = await listAll(ref(storage));
      setAudioList(items.reverse());
      setIsListLoading(false);
    } catch (error) {
      console.log(error);
      setIsListLoading(false);
    }
  };

  return (
    <Container>
      <Title>
        <div className='container'>
          <AiOutlineArrowLeft size={30} onClick={() => navigate('/')} />
          <h2>재생목록</h2>
        </div>
      </Title>

      {!isListLoading && audioList ? (
        <ul>
          {audioList.map(storageRef => (
            <PlayList key={storageRef.name} storageRef={storageRef} handleSelect={handleSelect} curAudioName={curAudioName} handleDownload={handleDownload} handleRemove={handleRemove} />
          ))}
        </ul>
      ) : (
        <PlaySkeleton />
      )}

      <PlayBar>
        <div className='container'>
          <audio ref={audioElement} onEnded={handleStop} src={curAudioURL} />
          <h3>{isAudioLoading ? <Spinner /> : curAudioName}</h3>
          <p>{time}s</p>
          {isPlaying ? <BsStopCircle onClick={handleStop} size={40} /> : <BsPlayCircle onClick={handlePlay} size={40} />}
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

  svg {
    cursor: pointer;
  }

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
    padding-top: 71px;
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

  svg {
    cursor: pointer;
  }
`;

export default Play;
