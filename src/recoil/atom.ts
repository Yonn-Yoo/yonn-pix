import { atom } from 'recoil';
import { searchReqBodyType } from '../types/reqBody';

export const searchFilter = atom<searchReqBodyType>({
  key: 'searchFilter',
  default: {
    query: '',
    order_by: 'relevant',
  },
});

export const loader = atom({
  key: 'loader',
  default: false,
});

export const images = atom({
  key: 'images',
  default: ['/tmp/1.jpg'],
});
