import React from "react";
import handleDeleteData from "../../feature/deleteData";

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
function RoutineTable({
  routines,
  setRoutines,
  frequency,
  handleCheckboxChange,
  setError,
}) {
  return (
    <div className="w-full-mx-4 ">
      <div className="overflow-x-auto shadow-sm">
        <table className="w-full table-fixed border-collapse ">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-[12%] sm:w-[15%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base">
                Done
              </th>
              <th className="w-[38%] sm:w-[40%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base">
                Title
              </th>
              <th className="w-[35%] sm:w-[30%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base hidden sm:table-cell">
                Added
              </th>
              <th className="w-[15%] py-3 px-2 sm:px-4 border-b text-left font-medium text-gray-700 text-sm sm:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {routines
              .filter((routine) => routine.frequency === frequency)
              .map((routine, index) => {
                const { date, time } = formatDateTime(routine.added);
                return (
                  <tr
                    key={index}
                    className={`border-b ${routine.completed ? "bg-gray-50 text-gray-500" : "bg-white"} hover:bg-gray-50`}
                  >
                    <td className="py-3 px-2 sm:px-4">
                      <input
                        type="checkbox"
                        checked={routine.completed}
                        onChange={() => handleCheckboxChange(routine)}
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      />
                    </td>
                    <td
                      className={`py-3 px-2 sm:px-4 ${routine.completed ? "line-through" : ""}`}
                    >
                      <div className="truncate text-sm sm:text-base">
                        {routine.task}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 sm:hidden">
                        {date} {time}
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">
                      <div className="text-sm text-gray-600">
                        <span className="block">{date}</span>
                        <span className="text-gray-500">{time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      <button
                        onClick={() => handleDeleteData(routine._id , "routine" , setRoutines , routines , setError)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors"
                        aria-label="Delete routine"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {routines.filter((routine) => routine.frequency === frequency).length ===
        0 && (
        <div className="text-center py-4 text-gray-500 text-sm sm:text-base">
          No routines found for this frequency
        </div>
      )}
    </div>
  );
}
export default RoutineTable;
