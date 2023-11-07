import { Component } from 'react';

import { fetchImages } from 'api';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import { StyledApp } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query: nextQuery, page: nextPage } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      if (nextQuery === '') {
        return;
      }

      try {
        this.setState({ loading: true });

        const queryImages = await fetchImages(nextQuery, nextPage);

        if (nextPage === 1) {
          this.setState({ images: [...queryImages] });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...queryImages],
          }));
        }

        if (queryImages.length === 0) {
          this.setState({ query: '' });
          return toast.success(
            `Sorry, we didn't find images to Your request, try write another one.`,
            {
              iconTheme: {
                primary: '#ffff00',
              },
            }
          );
        }
      } catch (error) {
        return toast.error(
          `Ooops, there was an error ${error.message}. Please, try one more time.`
        );
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  changeQuery = e => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();

    if (newQuery === '') {
      this.setState({ images: [], query: '' });
      return toast.error(
        'You forgot to write searching request, please, try one more time.'
      );
    }
    this.setState({
      query: newQuery,
      page: 1,
    });
    e.target.reset();
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.changeQuery} />
        <ImageGallery images={images} />
        {images.length >= 1 && <Button loadMore={this.loadMore} />}
        <Loader loading={loading} />
        <Toaster />
      </StyledApp>
    );
  }
}
