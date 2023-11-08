import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { fetchImages } from 'api';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import { StyledApp } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    fetchImg(query, page);
  }, [query, page]);

  const fetchImg = async (q, p) => {
    try {
      setLoading(true);
      const { hits, totalHits } = await fetchImages(q, p);
      if (page === 1) {
        setImages([...hits]);
        setTotalImages(totalHits);
      } else {
        setImages(prevState => [...prevState, ...hits]);
      }

      if (hits.length === 0) {
        setQuery('');
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
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const changeQuery = e => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();

    if (newQuery === '') {
      setImages([]);
      setQuery('');
      return toast.error(
        'You forgot to write searching request, please, try one more time.'
      );
    }
    setQuery(newQuery);
    setPage(1);
    e.target.reset();
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={changeQuery} />
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && page < Math.ceil(totalImages / 12) && (
        <Button loadMore={() => setPage(prevPage => (prevPage += 1))} />
      )}
      {loading && images.length > 0 && <Loader loading={loading} />}
      <Toaster />
      {error &&
        toast.error(`Ooops, there was an error. Please, try one more time.`)}
    </StyledApp>
  );
};
