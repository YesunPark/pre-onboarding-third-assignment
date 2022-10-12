import { useRef } from 'react';
import { IoIosPlay, IoMdPause } from 'react-icons/io';
import styled from 'styled-components';
import { StartButton } from '../../pages/record/Record';

const PlayBtn = ({ isPlaying, setIsPlaying, audioURL }) => {
  const audioElement = useRef(null);

  const toggleAudio = () => {
    if (audioURL) {
      if (!isPlaying) {
        setIsPlaying(true);
        audioElement.current.play();
      } else {
        audioElement.current.pause();
        audioElement.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  return (
    audioURL && (
      <PlayBtnContainer>
        <StartButton onClick={toggleAudio}>
          <span className='playBtn'>{isPlaying ? '중지' : '재생'}</span>
        </StartButton>
        <audio ref={audioElement} src={audioURL} onEnded={() => setIsPlaying(false)} onClick={toggleAudio}>
          오디오 재생 x
        </audio>
      </PlayBtnContainer>
    )
  );
};

const PlayBtnContainer = styled.div`
  .playBtn {
    line-height: 30px;
  }
`;

export default PlayBtn;
