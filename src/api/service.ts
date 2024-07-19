import { searchReqBodyType } from '../types/reqBody';
import initAxios from './api';

const axios = initAxios();

export const getRandomPhotos = async (count: number) => {
  const { data: images } = await axios.get('/photos/random', {
    params: {
      count,
    },
  });

  return images;
};

export const searchPhotos = async (reqBody: searchReqBodyType) => {
  const { data: images } = await axios.get('/search/photos', {
    params: {
      ...reqBody,
      per_page: 30,
    },
  });

  return images;
};
