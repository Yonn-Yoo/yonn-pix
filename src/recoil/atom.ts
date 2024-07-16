import { atom } from 'recoil';
import { searchReqBodyType } from '../types/reqBody';
import { ImageDataType } from '../types/type';

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

export const images = atom<ImageDataType[]>({
  key: 'images',
  default: [],
});
