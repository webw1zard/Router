import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function Todos() {
  const { id } = useParams(); 
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Todo[]>(`http://localhost:3001/todos?userId=${id}`)
      .then((response) => setTodos(response.data))
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setError("Failed to load todos.");
      });
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Todos</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="bg-purple-100 p-4 mb-4 rounded-lg">
            <h3 className="text-xl font-semibold">{todo.title}</h3>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Todos;
