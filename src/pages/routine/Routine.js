import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RoutineTable from "./RoutineTable";
import Emptydata from "../../components/ui/Emptydata";
import LoadingScreen from "../../components/ui/LoadingScreen";
import fetchData from "../../feature/fetchData"
const API_URL = `${process.env.API_URL}/routine`;

function Routine() {
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");
  

  // Fetch routines from the database
  useEffect(() => {
    if(!email){
      setLoading(false);
      return;
    };
    fetchData("routine" , email , setRoutines , setLoading , setError);
  }, [email]);


  // Handle checkbox click to update completed state locally
  const handleCheckboxChange = async (routine) => {
    const updatedRoutine ={
      ...routine,
      completed: !routine.completed
    }
    setRoutines(
      routines.map((t) => (t._id === routine._id ? updatedRoutine : t))
    );

    // Update the database with the new state
    try {
      await axios.put(`${API_URL}/${updatedRoutine._id}`, updatedRoutine);
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
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
              setRoutines={setRoutines}
              frequency="Daily"
              handleCheckboxChange={handleCheckboxChange}
              setError={setError}
            />
          </div>

          {/* Weekly Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Weekly Routines</h2>
            <RoutineTable 
              routines = {routines} 
              setRoutines={setRoutines}
              frequency= "Weekly"
              handleCheckboxChange={handleCheckboxChange}
              setError={setError}
            />
          </div>

          {/* Monthly Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Monthly Routines</h2>
                <RoutineTable 
                  routines = {routines} 
                  setRoutines={setRoutines}
                  frequency = "Monthly"
                  handleCheckboxChange={handleCheckboxChange} 
                  setError={setError}
                />
          </div>
        </div>
      }
    </div>
  );
}

export default Routine;
