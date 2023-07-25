import React, { Component } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

import { fetchImages } from 'helpers/api';

import { AppDiv } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    totalHits: null,
    page: 1,
    selectedImage: null,
    isLoading: false,
    error: null,
    modal: { isOpen: false, visibleData: null },
  };

  onSubmitForm = e => {
    e.preventDefault();

    this.setState(() => ({ page: 1 }));
    const inputValue = e.target.elements[1].value.trim();

    if (inputValue === '') {
      this.setState(() => ({ images: [], searchQuery: '' }));
      return alert(
        `You forgot to write searching request, please, try one more time.`
      );
    }

    this.setState(() => ({ searchQuery: inputValue }));
    e.target.elements[1].value = '';
  };

  onLoadMoreBtnClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  onSelectImage = imageId => {
    this.setState(() => ({ selectedImage: imageId }));
  };

  onOpenModal = data => {
    this.setState(() => ({
      modal: { isOpen: true, visibleData: data },
    }));
  };

  onCloseModal = () => {
    this.setState(() => ({
      modal: { isOpen: false, visibleData: null },
      selectedImage: null,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      if (this.state.searchQuery === '') {
        return;
      }
      try {
        this.setState(() => ({ isLoading: true }));
        const { hits, totalHits } = await fetchImages(
          this.state.searchQuery,
          this.state.page
        );

        if (this.state.page === 1) {
          this.setState(() => ({ images: [...hits], totalHits }));
        } else {
          this.setState(state => ({
            images: [...state.images, ...hits],
            totalHits,
          }));
        }

        if (hits.length === 0) {
          alert(
            `Sorry, we didn't find images to Your request, try write another one.`
          );
          this.setState(() => ({ searchQuery: '' }));
        }
      } catch (error) {
        this.setState(() => ({ error: error.message }));
      } finally {
        this.setState(() => ({ isLoading: false }));
      }
    }

    if (prevState.selectedImage !== this.state.selectedImage) {
      if (this.state.selectedImage === null) {
        return;
      }
      const largeImage = this.state.images.find(
        el => el.id === this.state.selectedImage
      );
      this.onOpenModal(largeImage);
    }
  }

  render() {
    return (
      <AppDiv>
        <Searchbar onSubmitForm={this.onSubmitForm} />
        {this.state.isLoading && this.state.images.length <= 0 && <Loader />}
        {this.state.error !== null && (
          <p>
            Something wrong. The error is: {this.state.error}. Please try again
            later.
          </p>
        )}
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            selectImg={this.onSelectImage}
          />
        )}
        {this.state.isLoading && this.state.images.length > 0 && <Loader />}
        {this.state.images.length > 0 &&
          this.state.page < Math.ceil(this.state.totalHits / 12) && (
            <Button onBtnClick={this.onLoadMoreBtnClick} />
          )}
        {this.state.modal.isOpen && (
          <Modal
            modalData={this.state.modal.visibleData}
            onCloseModal={this.onCloseModal}
          />
        )}
      </AppDiv>
    );
  }
}
