import { Post } from './types';

const POSTS_KEY = 'posts';

export const getPostsFromLocalStorage = (): Post[] => {
  if (typeof window !== 'undefined') {
    const posts = localStorage.getItem(POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  }
  return [];
};

export const savePostsToLocalStorage = (posts: Post[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }
};

export const clearLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(POSTS_KEY);
  }
};
