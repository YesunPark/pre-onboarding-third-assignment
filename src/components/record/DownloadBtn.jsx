import { StartButton } from '../../pages/record/Record';

const DownloadBtn = ({ audioURL }) => {
  const clickDownloadBtn = () => {
    const a = document.createElement('a');
    a.href = audioURL;
    a.download = `음성녹음.mp3`;
    a.click();
    a.remove();
  };

  return audioURL && <StartButton onClick={clickDownloadBtn}>다운로드</StartButton>;
};

export default DownloadBtn;
