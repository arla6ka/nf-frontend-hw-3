'use client';

import { useEffect, useState } from 'react';
import { fetchPostsFromAPI } from './lib/api';
import { getPostsFromLocalStorage, savePostsToLocalStorage, clearLocalStorage } from './lib/localStorage';
import PostList from './components/PostList';
import PostManager from './components/PostManager';
import ThemeToggle from './components/ThemeToggle';
import { Post } from './lib/types';
import { ThemeProvider } from './context/ThemeContext';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedPosts = getPostsFromLocalStorage();
    setPosts(storedPosts);
  }, []);

  const handleFetchPosts = async () => {
    const apiPosts = await fetchPostsFromAPI();
    const storedPosts = getPostsFromLocalStorage();
    const mergedPosts = [...storedPosts, ...apiPosts];
    savePostsToLocalStorage(mergedPosts);
    setPosts(mergedPosts);
  };

  const handleAddPost = (newPost: Post) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const handleUpdatePost = (postId: number, updatedPost: { title: string; body: string }) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const handleDeleteAllPosts = () => {
    clearLocalStorage();
    setPosts([]);
  };

  return (
    <ThemeProvider>
      <div className="container mx-auto my-12 px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-4 text-center">Главная страница</h1>
        <ThemeToggle />
        <div className="flex space-x-4 mb-4">
          <button onClick={handleFetchPosts} className="bg-blue-500 text-white p-2 rounded">
            Load Posts from API
          </button>
          <button onClick={handleDeleteAllPosts} className="bg-red-500 text-white p-2 rounded">
            Delete All Posts
          </button>
        </div>
        <PostManager token={token || ''} onAddPost={handleAddPost} />
        <PostList posts={posts} onDeletePost={handleDeletePost} onUpdatePost={handleUpdatePost} />
      </div>
    </ThemeProvider>
  );
};

export default Home;
