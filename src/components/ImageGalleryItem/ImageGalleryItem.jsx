import { Component } from 'react';
import Modal from 'react-modal';

import { StyledImageGalleryItem, StyledGalleryImg } from './ImageGalleryItem.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const {
      img: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <StyledImageGalleryItem>
        <StyledGalleryImg src={webformatURL} alt={tags} onClick={this.openModal} />
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <img src={largeImageURL} alt={tags} />
        </Modal>
      </StyledImageGalleryItem>
    );
  }
}
