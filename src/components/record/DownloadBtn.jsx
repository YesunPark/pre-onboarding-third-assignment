import { StartButton } from '../../pages/record/Record';

const DownloadBtn = ({ audioURL, audioName }) => {
  const clickDownloadBtn = () => {
    const a = document.createElement('a');
    a.href = audioURL;
    a.download = `${audioName}.mp3`;
    a.click();
    a.remove();
  };

  return audioURL && <StartButton onClick={clickDownloadBtn}>다운로드</StartButton>;
};

export default DownloadBtn;
