import { Component } from 'react';
import PropTypes from 'prop-types';

import { ModalOverlayDiv, ModalDiv } from './Modal.styled';

export class Modal extends Component {
  handleKeydownEsc = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownEsc);
  }

  render() {
    return (
      <ModalOverlayDiv onClick={this.handleOverlayClick}>
        <ModalDiv>
          <img
            src={this.props.modalData.largeImageURL}
            alt={this.props.modalData.tags}
          />
        </ModalDiv>
      </ModalOverlayDiv>
    );
  }
}

Modal.propTypes = {
  modalData: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
