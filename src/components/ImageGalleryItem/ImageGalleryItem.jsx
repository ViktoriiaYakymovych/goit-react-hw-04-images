import PropTypes from 'prop-types';

import {
  ImageGalleryItemLi,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, selectImg }) => {
  const { webformatURL, tags, id } = image;
  return (
    <ImageGalleryItemLi onClick={() => selectImg(id)}>
      <ImageGalleryItemImg src={webformatURL} alt={tags} />
    </ImageGalleryItemLi>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  selectImg: PropTypes.func.isRequired,
};
