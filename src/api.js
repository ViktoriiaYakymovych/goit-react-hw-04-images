import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '36706686-66124fda296938ef4c6de376b';

export const fetchImages = async (searchValue, page) => {
  const response = await axios.get(
    `/?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
