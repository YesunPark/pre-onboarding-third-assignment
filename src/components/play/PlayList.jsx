import styled from 'styled-components';

const PlayList = ({ storageRef }) => {
  return <StyledList>{storageRef.name}</StyledList>;
};

const StyledList = styled.li``;

export default PlayList;
