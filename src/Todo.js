import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Emptydata from "./Emptydata";

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function Todo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const email = localStorage.getItem("email");

  const API_URL = "https://roodobackend-production.up.railway.app/api/todo"; // Backend endpoint

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
        const response =  await axios.get(API_URL, {
          params: { 
            email : email},
        });
        if(!response){
          throw new Error("No response from the server");
        }
        setTodos(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message + " in datatbase" || "Failed to fetch todos. Please try again.");
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // const disableCheckbox = ()=>{
  //   todos.map((todo)=>{
  //     const now = new Date();
  //     const diff = new Date(todo.deadline) - now;
  //       const updatedTodo = {
  //         ...todo,
  //         isDisabled:(diff < 0)?  true: false
  //       }
  //       console.log(updatedTodo)
  //       setTodos(
  //         todos.map((t) => (t._id === todo._id ? updatedTodo : t))
  //       )
  //       console.log(todos);
  //       console.log(todos)
  //     }
  //   )
  // }

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
      return {
        text:"Time's up!",
        expired:true
      };
    }

    const days = Math.floor(diff / (1000 * 3600 * 24));
    const hours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      text:`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
      expired :false
    };
  };

  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-3xl font-serif">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <Link
        to="/todo/add"
        className="bg-green-600 text-white px-3 py-1 text-custom-button rounded-lg mb-6 inline-block"
      >
        Add New Todo
      </Link>


      {/* Show message if no todos */}
      {(todos.length === 0)? <Emptydata type="todo" /> :
        <div className="w-full-mx-4 overflow-x-auto shadow-sm">
          <table className="w-full table-fixed border-collapse">
  <thead>
    <tr className="bg-gray-100">
      <th className="w-[10%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base">
        Done
      </th>
      <th className="w-[25%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base">
        Title
      </th>
      <th className="w-[15%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base hidden sm:table-cell">
        Deadline
      </th>
      <th className="w-[15%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base hidden sm:table-cell">
        Remaining Time
      </th>
      <th className="w-[15%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base hidden sm:table-cell">
        Punishment
      </th>
      <th className="w-[20%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base">
        Actions
      </th>
    </tr>
  </thead>
  <tbody>
    {todos.map((todo, index) => {
      const { date, time } = formatDateTime(todo.deadline);
      const remainingTime = getRemainingTime(todo.deadline, todo);
      return (
        <tr
          key={todo._id}
          className={`border-b ${todo.isCompleted ? "bg-gray-50 text-gray-500" : "bg-white"} hover:bg-gray-50`}
        >
          <td className="py-3 px-2 sm:px-4">
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
              className="h-4 w-4 rounded border-gray-300 cursor-pointer"
              disabled = {remainingTime.expired}
            />
          </td>
          <td
            className={`py-3 px-2 sm:px-4 ${todo.isCompleted ? "line-through" : ""}`}
          >
            <div className="truncate text-sm sm:text-base">
              {todo.title}
            </div>
            <div className="text-xs text-gray-500 mt-1 sm:hidden">
              {date} {time}
              {todo.punishment && (
                <span className="text-red-500 ml-2">{todo.punishment}</span>
              )}
            </div>
          </td>
          <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">
            <div className="text-sm text-gray-600">
              <span className="block">{date}</span>
              <span className="text-gray-500">{time}</span>
            </div>
          </td>
          <td className="py-3 px-2 sm:px-4 hidden sm:table-cell text-sm text-gray-600">
            {remainingTime.text}
          </td>
          <td className="py-3 px-2 sm:px-4 hidden sm:table-cell text-sm text-red-500">
            {todo.punishment || "No punishment"}
          </td>
          <td className="py-3 px-2 sm:px-4">
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors"
              aria-label="Delete todo"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

          {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
      </div>
    }
    </div>
  );
}

export default Todo;
