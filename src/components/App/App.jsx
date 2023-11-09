import { useEffect, useState, useRef } from 'react';

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

   const controllerRef = useRef();

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImg = async (q, p) => {
      if(controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();
      try {
        setLoading(true);
        const { hits, totalHits } = await fetchImages(q, p, controllerRef);

        if (hits.length === 0) {
          return toast.success(
            `Sorry, we didn't find any images to Your request. Please, try to write another one.`,
            {
              iconTheme: {
                primary: '#ffff00',
              },
            }
          );
        }

        setImages(prevState => [...prevState, ...hits]);
        setTotalImages(totalHits);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          setError(err.message);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImg(query, page);
  }, [query, page]);

  const changeQuery = e => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();

    if (newQuery === '') {
      return toast.error(
        `Sorry, we can't submit empty request. Please, write what You want to search.`
      );
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    e.target.reset();
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={changeQuery} />
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && page < Math.ceil(totalImages / 12) && !loading && (
        <Button loadMore={() => setPage(prevPage => (prevPage += 1))} />
      )}
      {loading && <Loader loading={loading} />}
      <Toaster />
      {error &&
        toast.error(`Ooops, there was an error. Please, try one more time.`)}
    </StyledApp>
  );
};
