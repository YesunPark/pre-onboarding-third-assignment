import styled from 'styled-components';

recordPlay = new MediaPlayer();

const Play = () => {
  //음성이 녹음된 후 재생컴포넌트 만들기
  //재생 버튼 클릭 시 재생화면나오게
  // navigator.mediaDevices.getUserMedia({ audio: true });

  return <PlayContainer>Play</PlayContainer>;
};

const PlayContainer = styled.div``;

export default Play;
