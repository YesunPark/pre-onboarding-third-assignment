import { useEffect, useRef, useState } from 'react';
import { StartButton } from '../../pages/record/Record';

const PlayBtn = ({ isPlaying, setIsPlaying, isSaving, audioURL }) => {
  const [playTime, setPlayTime] = useState(0);
  const audioElement = useRef(null);

  const clickPlayBtn = () => {
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

  useEffect(() => {
    const playTime = setInterval(() => {
      if (isPlaying) {
        setPlayTime(prev => prev + 1);
      }
    }, 1000);
    return () => {
      clearInterval(playTime);
      setPlayTime(0);
    };
  }, [isPlaying]);

  return (
    audioURL && (
      <>
        <audio
          ref={audioElement}
          src={audioURL}
          onEnded={() => {
            setIsPlaying(false);
          }}
        />
        <StartButton disabled={isSaving} onClick={clickPlayBtn}>
          {isSaving && '저장 중...'}
          {!isSaving && !isPlaying && '재생'}
          {!isSaving && isPlaying && `0:${playTime} 중지`}
        </StartButton>
      </>
    )
  );
};

export default PlayBtn;
