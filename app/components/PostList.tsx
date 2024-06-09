import React from 'react';
import { Post } from '../lib/types';

interface PostListProps {
  posts: Post[];
  onDeletePost: (postId: number) => void;
  onUpdatePost: (postId: number, updatedPost: { title: string; body: string }) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDeletePost, onUpdatePost }) => {
  const handleUpdatePost = (postId: number) => {
    const title = prompt('Enter new title');
    const body = prompt('Enter new body');
    if (title && body) {
      onUpdatePost(postId, { title, body });
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="p-4 border mb-4 rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => handleUpdatePost(post.id)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
          <button onClick={() => onDeletePost(post.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
