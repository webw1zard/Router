import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Album {
  id: number;
  title: string;
}

function Albums() {
  const { id } = useParams(); 
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Album[]>(`http://localhost:3001/albums?userId=${id}`)
      .then((response) => setAlbums(response.data))
      .catch((error) => {
        console.error("Error fetching albums:", error);
        setError("Failed to load albums.");
      });
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Albums</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        albums.map((album) => (
          <div key={album.id} className="bg-purple-100 p-4 mb-4 rounded-lg">
            <h3 className="text-xl font-semibold">{album.title}</h3>
            
          </div>
        ))
      )}
    </div>
  );
}

export default Albums;
