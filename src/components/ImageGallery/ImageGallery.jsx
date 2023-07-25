import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImageGalleryUl } from './ImageGallery.styled';

export const ImageGallery = ({ images, selectImg }) => {
  return (
    <ImageGalleryUl>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            selectImg={selectImg}
          />
        );
      })}
    </ImageGalleryUl>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  selectImg: PropTypes.func.isRequired,
};
