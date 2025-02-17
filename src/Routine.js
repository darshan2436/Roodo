import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RoutineTable from "./RoutineTable";
import Emptydata from "./Emptydata";

function Routine() {
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = "https://roodobackend-production.up.railway.app/api/routine";
  const email = localStorage.getItem("email");
  

  // Fetch routines from the database
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response =  await axios.get(API_URL, {
          params: { 
            email : email},
        });
        if(!response){
          throw new Error("No response from the server");
        }
        setRoutines(response.data);
        setLoading(false);
      } catch (err) {
        Error("Failed to fetch routines. Please try again.");
        setLoading(false);
        setError(err.message + " in database" || "Failed to fetch routines. Please try again.");
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
      await axios.put(`${API_URL}/${updatedRoutines[index]._id}`, updatedRoutines[index]);
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  // Handle routine deletion with password confirmation
  const handleDelete = async (id) => {
    const enteredPassword = prompt("Are sure to delete ? Enter y/Y to confirm:");
    if (enteredPassword === "y" || enteredPassword === "Y") {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setRoutines(routines.filter((routine) => routine._id !== id));
        alert("Routine deleted successfully!");
      } catch (error) {
        console.error("Error deleting routine:", error);
      }
    } else {
      alert("Routine deletion cancelled.");
    }
  };

  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-3xl font-serif">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Routine</h1>

      <Link
        to="/routine/add"
        className="bg-green-600 text-white px-2 py-1.5 text-custom-button rounded-lg mb-6 inline-block"
      >
        Add New Routine
      </Link>

      {/* Show message if no routines */}
      {(routines.length === 0)? <Emptydata type="routine" /> :
        <div>
          {/* Daily Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Daily Routines</h2>
            <RoutineTable
              routines={routines}
              frequency="Daily"
              handleCheckboxChange={handleCheckboxChange}
              handleDelete={handleDelete}
            />
          </div>

          {/* Weekly Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Weekly Routines</h2>
            <RoutineTable 
              routines = {routines} 
              frequency= "Weekly"
              handleCheckboxChange={handleCheckboxChange} 
              handleDelete={handleDelete}
            />
          </div>

          {/* Monthly Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Monthly Routines</h2>
                <RoutineTable 
                  routines = {routines} 
                  frequency = "Monthly"
                  handleCheckboxChange={handleCheckboxChange} 
                  handleDelete={handleDelete} 
                />
          </div>
        </div>
      }
    </div>
  );
}

export default Routine;
