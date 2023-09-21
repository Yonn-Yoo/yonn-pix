import initAxios from './api';

const axios = initAxios();

export const getRandomPhotos = async (count: number) => {
  return await axios.get('/photos/random', {
    params: {
      count,
    },
  });
};
