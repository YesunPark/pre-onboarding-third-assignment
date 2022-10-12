import styled from 'styled-components';

const PlayList = ({ storageRef, selectHandler, curAudioName }) => {
  return (
    <StyledList isPlaying={curAudioName === storageRef.name} onClick={() => selectHandler(storageRef)}>
      {storageRef.name}
    </StyledList>
  );
};

const StyledList = styled.li`
  padding: 20px 10px;
  background-color: ${({ isPlaying }) => (isPlaying ? '#63dada' : '#3eacac')};
`;

export default PlayList;
