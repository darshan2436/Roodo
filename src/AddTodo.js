import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Optional success state
  const navigate = useNavigate();

  //add email to the todo

  const API_URL = "http://localhost:4040/api/todo"; // Backend endpoint

  const handleAddTodo = async () => {
    if (!title || !deadline) {
      setError("Both title and deadline are required!");
      return;
    }

    const newTodo = {
      title,
      deadline: new Date(deadline),
      added: new Date(),
      completedAt: null,
      punishment: "",
      isCompleted: false, // make sure to add this field in database
    };

    try {
      // Send POST request to the backend
      const response = await axios.post(API_URL, newTodo);
      console.log("Todo added successfully:", response.data);

      setSuccess(true);
      setError("");

      // Navigate back to the Todo list page after a brief delay
      setTimeout(() => navigate("/todo"), 1000);
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Todo</h1>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo Title"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Todo added successfully!</p>}
      <button
        onClick={handleAddTodo}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
