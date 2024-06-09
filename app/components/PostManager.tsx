import React, { useState } from 'react';
import { Post } from '../lib/types';

interface PostManagerProps {
  token: string;
  onAddPost: (newPost: Post) => void;
}

const PostManager: React.FC<PostManagerProps> = ({ token, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddPost = () => {
    const newPost: Post = {
      id: Date.now(),
      title,
      body,
      userId: 1,
    };
    onAddPost(newPost);
    setTitle('');
    setBody('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleAddPost} className="bg-blue-500 text-white p-2 rounded">
        Add Post
      </button>
    </div>
  );
};

export default PostManager;
