import React, { useState } from 'react';
import { Post } from '../lib/types';
import Link from 'next/link';

interface PostItemProps {
  post: Post;
  onDelete: () => void;
  onUpdate: (updatedPost: { title: string; body: string }) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSave = () => {
    onUpdate({ title, body });
    setIsEditing(false);
  };

  return (
    <div className="border p-4 rounded mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded ml-2">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p>{post.body}</p>
          <div className="flex space-x-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded">
              Edit
            </button>
            <button onClick={onDelete} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
            <Link href={`/posts/${post.id}`} className="bg-blue-500 text-white p-2 rounded">
              Read More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
