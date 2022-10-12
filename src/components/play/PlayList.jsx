import styled from 'styled-components';
import { BsDownload, BsFillTrashFill } from 'react-icons/bs';

const PlayList = ({ storageRef, handleSelect, curAudioName, handleDownload, handleRemove }) => {
  return (
    <StyledList isPlaying={curAudioName === storageRef.name} onClick={() => handleSelect(storageRef)}>
      {storageRef.name}
      {curAudioName === storageRef.name && (
        <BtnContainer>
          <DownloadIcon onClick={handleDownload} />
          <BsFillTrashFill onClick={handleRemove} />
        </BtnContainer>
      )}
    </StyledList>
  );
};

const StyledList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 20px;
  background-color: ${({ isPlaying }) => (isPlaying ? '#63dada' : '#3eacac')};
  cursor: pointer;

  &:hover {
    background-color: ${({ isPlaying }) => (isPlaying ? '#63dada' : '#48b6b6')};
  }
`;

const DownloadIcon = styled(BsDownload)`
  cursor: pointer;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export default PlayList;
