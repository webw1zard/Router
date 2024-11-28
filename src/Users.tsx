import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:3001/users")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("API fetch error:", error);
        setError("Failed to load user data");
      });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">User Cards</h1>
      {error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 mb-4" key={user.id}>
              <div className="card shadow-sm p-3 border">
                <div className="card-body">
                  <h2 className="card-title">{user.name}</h2>
                  <p className="card-text">
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  {user.website && (
                    <p className="card-text">
                      <strong>Website:</strong>{" "}
                      <a
                        href={`http://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        {user.website}
                      </a>
                    </p>
                  )}
                  <p className="card-text">
                    <strong>Address:</strong> {user.address.street},{" "}
                    {user.address.city}, {user.address.zipcode}
                  </p>
                  <p className="card-text">
                    <strong>Company:</strong> {user.company.name}
                  </p>
                  <Link to={`/users/${user.id}`} className="btn btn-primary">
                    Show Cabinet
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
