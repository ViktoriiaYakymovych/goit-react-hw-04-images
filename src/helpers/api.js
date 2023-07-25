import axios from 'axios';

const API_KEY = '36706686-66124fda296938ef4c6de376b';

export const fetchImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );

  return data;
};
