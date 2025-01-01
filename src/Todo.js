import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const API_URL = "roodobackend-production.up.railway.app/api/todo";

  const punishments = [
    "Do 10 push-ups",
    "Run for 10 minutes",
    "Write 1 page",
    "No social media for 1 hour",
    "No junk food for 1 day",
  ];

  // Fetch todos from the database
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError("Failed to fetch todos. Please try again later.");
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Assign a punishment randomly when the time is up
  const assignPunishment = async (todo) => {
    const randomPunishment = punishments[Math.floor(Math.random() * punishments.length)];
    try {
      const updatedTodo = {
        ...todo,
        punishment: randomPunishment,
      };
      await axios.put(`${API_URL}/${todo._id}`, updatedTodo);
      setTodos(
        todos.map((t) => (t._id === todo._id ? updatedTodo : t))
      );
    } catch (err) {
      console.error("Error assigning punishment:", err);
      setError("Failed to assign punishment. Please try again.");
    }
  };

  // Delete todo from the database
  const handleDeleteTodo = async (id) => {
    const confirm = prompt("Are you sure you want to delete the row press y/Y to confirm:");
    

    if (confirm === 'y' || confirm === 'Y') {	
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter((todo) => todo._id !== id));
      } catch (err) {
        console.error("Error deleting todo:", err);
        setError("Failed to delete todo. Please try again.");
      }
    } else {
      setPasswordError("Todo deletion cancelled.");
    }
  };

  // add isCompleted field to the database

  // Calculate remaining time
  const getRemainingTime = (deadline, todo) => {
    const now = new Date();
    const diff = new Date(deadline) - now;

    if (diff <= 0) {
      if (!todo.punishment) {
        assignPunishment(todo);
      }
      return "Time's up!";
    }

    const days = Math.floor(diff / (1000 * 3600 * 24));
    const hours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <Link
        to="/todo/add"
        className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6 inline-block"
      >
        Add New Todo
      </Link>

      <table className="min-w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Completed</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Deadline</th>
            <th className="py-2 px-4 border">Remaining Time</th>
            <th className="py-2 px-4 border">Punishment</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
            {/*todo is not updated in the database*/}
          {todos.map((todo) => (
            <tr
              key={todo._id}
              className={`text-center ${
                todo.isCompleted
                  ? "bg-gray-200 text-gray-500 line-through"
                  : "bg-white"
              }`}
            >
              <td className="py-2 px-4 border">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={async () => {
                    try {
                      const updatedTodo = {
                        ...todo,
                        isCompleted: !todo.isCompleted,
                      };
                      await axios.put(`${API_URL}/${todo._id}`, updatedTodo);
                      setTodos(
                        todos.map((t) =>
                          t._id === todo._id ? updatedTodo : t
                        )
                      );
                    } catch (err) {
                      console.error("Error updating todo:", err);
                      setError("Failed to update todo. Please try again.");
                    }
                  }}
                />
              </td>
              <td className="py-2 px-4 border">{todo.title}</td>
              <td className="py-2 px-4 border">
                {new Date(todo.deadline).toLocaleString()}
              </td>
              <td className="py-2 px-4 border">
                {getRemainingTime(todo.deadline, todo)}
              </td>
              <td className="py-2 px-4 border">
                {todo.punishment || "No punishment yet"}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
    </div>
  );
}

export default Todo;
