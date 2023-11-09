import { useState } from 'react';

import { ModalWindow } from 'components/Modal/Modal';

import {
  StyledImageGalleryItem,
  StyledGalleryImg,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  img: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StyledImageGalleryItem>
      <StyledGalleryImg
        src={webformatURL}
        alt={tags}
        onClick={() => setIsModalOpen(true)}
      />
      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </StyledImageGalleryItem>
  );
};
