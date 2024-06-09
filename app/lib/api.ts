import axios from 'axios';
import { Post } from './types';

export const fetchPostsFromAPI = async (): Promise<Post[]> => {
  const response = await axios.get('https://dummyjson.com/posts');
  return response.data.posts;
};
