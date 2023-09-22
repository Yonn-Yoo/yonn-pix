import { atom } from 'recoil';
import { searchReqBodyType } from '../types/reqBody';

export const searchFilter = atom<searchReqBodyType>({
  key: 'searchFilter',
  default: {
    query: '',
    order_by: 'relevant',
  },
});
