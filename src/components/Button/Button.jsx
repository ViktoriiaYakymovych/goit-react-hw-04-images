import PropTypes from 'prop-types';

import { LoadMoreBtn } from './Button.styled';

export const Button = ({ onBtnClick }) => {
  return (
    <LoadMoreBtn onClick={onBtnClick} type="text">
      Load More
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
