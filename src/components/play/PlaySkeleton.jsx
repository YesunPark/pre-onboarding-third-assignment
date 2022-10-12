import styled from 'styled-components';

const PlaySkeleton = () => {
  return (
    <SkeletonList>
      <li className='title' />
      <li className='title' />
      <li className='title' />
      <li className='title' />
      <li className='title' />
      <li className='title' />
      <li className='title' />
    </SkeletonList>
  );
};

const SkeletonList = styled.ul`
  li.title {
    width: 280px;
    height: 16px;
    background-color: #48b6b6;
    margin: 20px 10px;
  }
`;

export default PlaySkeleton;
