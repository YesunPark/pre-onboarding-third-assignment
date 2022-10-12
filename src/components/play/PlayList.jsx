import styled from 'styled-components';

const PlayList = ({ storageRef }) => {
  return <StyledList>{storageRef.name}</StyledList>;
};

const StyledList = styled.li`
  padding: 20px 0;
  border-bottom: 1px solid white;
`;

export default PlayList;
