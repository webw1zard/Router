import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

function Posts() {
  const { id } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Post[]>(`http://localhost:3001/posts?userId=${id}`)
      .then((response) => setPosts(response.data))
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts.");
      });
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Posts</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-purple-100 p-4 mb-4 rounded-lg">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
