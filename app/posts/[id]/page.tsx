'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Post } from '../../lib/types';
import { getPostsFromLocalStorage } from '../../lib/localStorage';

interface PostPageProps {
  posts: Post[];
  onUpdatePost: (postId: number, updatedPost: { title: string; body: string }) => void;
}

const PostPage: React.FC<PostPageProps> = ({ posts, onUpdatePost }) => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const storedPosts = getPostsFromLocalStorage();
    const foundPost = storedPosts.find((post) => post.id === Number(id));
    if (!foundPost) {
      router.push('/');
    } else {
      setPost(foundPost);
    }
  }, [id, router]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSave = () => {
    onUpdatePost(post.id, { title, body });
    router.push('/');
  };

  return (
    <div className="container mx-auto my-12 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
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
      </div>
    </div>
  );
};

export default PostPage;
