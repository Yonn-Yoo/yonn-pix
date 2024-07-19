import { searchReqBodyType } from '../types/reqBody';
import initAxios from './api';

const axios = initAxios();

export const getRandomPhotos = async (count: number) => {
  const response = await axios.get('/photos/random', {
    params: {
      count,
    },
  });

  if (response.status !== 200) {
    throw new Error('Sorry, something went wrong 😢');
  }

  const images = response.data;

  return images;
};

export const searchPhotos = async (reqBody: searchReqBodyType) => {
  const response = await axios.get('/search/photos', {
    params: {
      ...reqBody,
      per_page: 30,
    },
  });

  if (response.status !== 200) {
    throw new Error('Sorry, something went wrong 😢');
  }

  const images = response.data;

  return images;
};
