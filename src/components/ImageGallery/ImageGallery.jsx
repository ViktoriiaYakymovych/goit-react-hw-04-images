import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

import { StyledImageGallery} from "./ImageGallery.styled";

export const ImageGallery = ({images}) => {
  return <StyledImageGallery>
    {images.map(img => {return <ImageGalleryItem key={img.id} img={img} />;})}
  </StyledImageGallery>;
};
