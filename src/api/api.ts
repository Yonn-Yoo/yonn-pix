import axios from 'axios';
import { ENV } from '../env';

export default function initAxios() {
  const client = axios.create({
    baseURL: ENV.NEXT_PUBLIC_UNSPLASH_API_URL,
    params: {
      client_id: ENV.NEXT_PUBLIC_ACCESS_KEY,
    },
  });
  return client;
}
