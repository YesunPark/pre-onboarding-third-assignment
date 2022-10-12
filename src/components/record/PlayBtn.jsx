import { useRef, useState } from 'react';
import { IoIosPlay, IoMdPause } from 'react-icons/io';
import styled from 'styled-components';

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
    <PlayBtnContainer>
      <audio ref={audioElement} src={audioURL} onEnded={() => setIsPlaying(false)} onClick={toggleAudio}>
        오디오 재생 x
      </audio>
      <span>{isPlaying ? '중지' : '재생'}</span>
      <button onClick={toggleAudio}>{isPlaying ? <IoMdPause /> : <IoIosPlay />}</button>
    </PlayBtnContainer>
  );
};

const PlayBtnContainer = styled.div``;

export default PlayBtn;
