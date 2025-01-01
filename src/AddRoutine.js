import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRoutine() {
  const [task, setTask] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //add email to the routine
  const email = localStorage.getItem("email");

  const handleAddRoutine = async () => {
    if (!task) {
      setError("Task title is required!");
      return;
    }

    // Create the new routine object
    const newRoutine = {
      task,
      frequency,
      completed: false, // Default to false
      // email,
    };

    try {
      // Send the routine to the backend
      await axios.post("https://roodobackend-production.up.railway.app/api/routine", newRoutine);

      // Navigate back to the Routine list page
      navigate("/routine");
    } catch (err) {
      console.error("Error adding routine:", err);
      setError("Failed to add routine. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Routine</h1>
      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Routine Task"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleAddRoutine}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Add Routine
      </button>
    </div>
  );
}

export default AddRoutine;
