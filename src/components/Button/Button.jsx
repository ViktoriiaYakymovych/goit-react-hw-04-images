import { StyledLoadMoreBtn } from './Button.styled';

export const Button = ({ loadMore }) => {
  return (
    <StyledLoadMoreBtn type="button" onClick={loadMore}>
      Load more
    </StyledLoadMoreBtn>
  );
};
