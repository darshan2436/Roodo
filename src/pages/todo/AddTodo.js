import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Optional success state
  const navigate = useNavigate();

  //add email to the todo
  const email = localStorage.getItem("email");

  const API_URL = "https://roodobackend-production.up.railway.app/api/todo"; // Backend endpoint

  const handleAddTodo = async () => {
    if (!title || !deadlineDate || !deadlineTime) {
      setError("Both title and deadline are required!");
      return;
    }

    const newTodo = {
      title,
      deadline: new Date(deadlineDate+"T"+deadlineTime),
      added: new Date(),
      completedAt: null,
      punishment: "",
      isCompleted: false, // make sure to add this field in database
      email: email, // add email to the todo
    };

    try {
      // Send POST request to the backend
      await axios.post(API_URL, newTodo);

      setSuccess(true);
      setError("");

      // Navigate back to the Todo list page after a brief delay
      setTimeout(() => navigate("/todo"), 500);
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Add New Todo</h1>
      <div className="mb-4 custom-width">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo Title"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4 custom-width">
        <input
          type="date"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4 custom-width">
        <input
          type="time"
          value={deadlineTime}
          onChange={(e) => setDeadlineTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Todo added successfully!</p>}
      <button
        onClick={handleAddTodo}
        className="bg-blue-600 custom-width text-white px-6 py-3 rounded-lg"
      >
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
