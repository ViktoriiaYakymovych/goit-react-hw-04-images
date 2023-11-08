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
    totalImages: 0,
    page: 1,
    loading: false,
    error: false,
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

        const resp = await fetchImages(nextQuery, nextPage).then(resp => resp);

        if (nextPage === 1) {
          this.setState({
            images: [...resp.hits],
            totalImages: resp.totalHits,
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...resp.hits],
          }));
        }

        if (resp.hits.length === 0) {
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
      } catch (err) {
        this.setState({ error: true });
        return toast.error(
          `Ooops, there was an error ${err.message}. Please, try one more time.`
        );
      } finally {
        this.setState({ loading: false, error: false });
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
    const { images, loading, totalImages, page } = this.state;

    return (
      <StyledApp>
        <Searchbar onSubmit={this.changeQuery} />
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && page < Math.ceil(totalImages / 12) && (
          <Button loadMore={this.loadMore} />
        )}
        {loading && images.length > 0 && <Loader loading={loading} />}
        <Toaster />
      </StyledApp>
    );
  }
}
