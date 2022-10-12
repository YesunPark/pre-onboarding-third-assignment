import styled from 'styled-components';
import { BsDownload } from 'react-icons/bs';

const PlayList = ({ storageRef, selectHandler, curAudioName, downloadHandler }) => {
  return (
    <StyledList isPlaying={curAudioName === storageRef.name} onClick={() => selectHandler(storageRef)}>
      {storageRef.name}
      {curAudioName === storageRef.name && <DownloadIcon onClick={downloadHandler} />}
    </StyledList>
  );
};

const DownloadIcon = styled(BsDownload)`
  cursor: pointer;
`;

const StyledList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ isPlaying }) => (isPlaying ? '#63dada' : '#3eacac')};
  cursor: pointer;

  &:hover {
    background-color: ${({ isPlaying }) => (isPlaying ? '#63dada' : '#48b6b6')};
  }
`;

export default PlayList;
