'use client';

import { useState, useEffect } from 'react';
import { fetchPostsFromAPI } from '../../lib/api';
import { getPostsFromLocalStorage, savePostsToLocalStorage } from '../../lib/localStorage';
import PostPage from './page';
import { Post } from '../../lib/types';

const PostPageContainer: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiPosts = await fetchPostsFromAPI();
      const storedPosts = getPostsFromLocalStorage();
      const mergedPosts = [...storedPosts, ...apiPosts];
      savePostsToLocalStorage(mergedPosts);
      setPosts(mergedPosts);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleUpdatePost = (postId: number, updatedPost: { title: string; body: string }) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PostPage posts={posts} onUpdatePost={handleUpdatePost} />
  );
};

export default PostPageContainer;
