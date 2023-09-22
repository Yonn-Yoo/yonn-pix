import { searchReqBodyType } from '../types/reqBody';
import initAxios from './api';

const axios = initAxios();

export const getRandomPhotos = async (count: number) => {
  return await axios.get('/photos/random', {
    params: {
      count,
    },
  });
};

export const searchPhotos = async (reqBody: searchReqBodyType) => {
  return await axios.get('/search/photos', {
    params: {
      ...reqBody,
      per_page: 30,
    },
  });
};
