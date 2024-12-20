import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Routine() {
  const [routines, setRoutines] = useState([]);

  // Fetch routines from the database
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get("http://localhost:4040/api/routine");
        setRoutines(response.data);
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    };
    fetchRoutines();
  }, []);


  // Handle checkbox click to update completed state locally
  const handleCheckboxChange = async (index) => {
    const updatedRoutines = [...routines];
    updatedRoutines[index].completed = !updatedRoutines[index].completed;
    setRoutines(updatedRoutines);

    // Update the database with the new state
    try {
      await axios.put(`http://localhost:4040/api/routine/${updatedRoutines[index]._id}`, updatedRoutines[index]);
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  // Handle routine deletion with password confirmation
  const handleDelete = async (id) => {
    const enteredPassword = prompt("Are sure to delete ? Enter y/Y to confirm:");
    if (enteredPassword === "y" || enteredPassword === "Y") {
      try {
        await axios.delete(`http://localhost:4040/api/routine/${id}`);
        setRoutines(routines.filter((routine) => routine._id !== id));
        alert("Routine deleted successfully!");
      } catch (error) {
        console.error("Error deleting routine:", error);
      }
    } else {
      alert("Routine deletion cancelled.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Routine</h1>

      <Link
        to="/routine/add"
        className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6 inline-block"
      >
        Add New Routine
      </Link>

      {/* Daily Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Daily Routines</h2>
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Completed</th>
              <th className="py-2 px-4 border">Task</th>
              <th className="py-2 px-4 border">Added</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {/*routine is not updated in the database*/}
            {routines
              .filter((routine) => routine.frequency === "Daily")
              .map((routine, index) => (
                <tr
                  key={index}
                  className={`text-center ${routine.completed ? 'bg-gray-200 text-gray-500 line-through' : 'bg-white'}`}
                >
                  <td className="py-2 px-4 border">
                    <input
                      type="checkbox"
                      checked={routine.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="py-2 px-4 border">{routine.task}</td>
                  <td className="py-2 px-4 border">{routine.added.toLocaleString()}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(routine._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Weekly Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Weekly Routines</h2>
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Completed</th>
              <th className="py-2 px-4 border">Task</th>
              <th className="py-2 px-4 border">Added</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {routines
              .filter((routine) => routine.frequency === "Weekly")
              .map((routine, index) => (
                <tr
                  key={index}
                  className={`text-center ${routine.completed ? 'bg-gray-200 text-gray-500 line-through' : 'bg-white'}`}
                >
                  <td className="py-2 px-4 border">
                    <input
                      type="checkbox"
                      checked={routine.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="py-2 px-4 border">{routine.task}</td>
                  <td className="py-2 px-4 border">{routine.added.toLocaleString()}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Monthly Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Monthly Routines</h2>
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Completed</th>
              <th className="py-2 px-4 border">Task</th>
              <th className="py-2 px-4 border">Added</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {routines
              .filter((routine) => routine.frequency === "Monthly")
              .map((routine, index) => (
                <tr
                  key={index}
                  className={`text-center ${routine.completed ? 'bg-gray-200 text-gray-500 line-through' : 'bg-white'}`}
                >
                  <td className="py-2 px-4 border">
                    <input
                      type="checkbox"
                      checked={routine.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="py-2 px-4 border">{routine.task}</td>
                  <td className="py-2 px-4 border">{routine.added.toLocaleString()}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Routine;
