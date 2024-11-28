import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Album {
  id: number;
  title: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${userId}`).then((response) => {
      setUser(response.data);
    });

    axios.get(`http://localhost:3001/posts?userId=${userId}`).then((response) => {
      setPosts(response.data);
    });

    axios.get(`http://localhost:3001/albums?userId=${userId}`).then((response) => {
      setAlbums(response.data);
    });

    axios.get(`http://localhost:3001/todos?userId=${userId}`).then((response) => {
      setTodos(response.data);
    });
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold text-center mb-5">{user.name}'s Cabinet</h1>

      <div className="bg-white shadow-md rounded-lg p-5 mb-5">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
      </div>

      <div className="bg-gray-100 p-4 mb-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Posts</h3>
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-3 mb-3 rounded shadow-md">
            <h4 className="text-lg font-semibold">{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {/* Albums */}
      <div className="bg-gray-100 p-4 mb-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Albums</h3>
        {albums.map((album) => (
          <div key={album.id} className="bg-white p-3 mb-3 rounded shadow-md">
            <h4 className="text-lg font-semibold">{album.title}</h4>
          </div>
        ))}
      </div>

      {/* Todos */}
      <div className="bg-gray-100 p-4 mb-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Todos</h3>
        {todos.map((todo) => (
          <div key={todo.id} className="bg-white p-3 mb-3 rounded shadow-md">
            <h4 className="text-lg font-semibold">{todo.title}</h4>
            <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
          </div>
        ))}
      </div>

      <Link to="/" className="btn bg-blue-500 text-white py-2 px-4 rounded">Back to Users</Link>
    </div>
  );
};

export default UserDetail;
