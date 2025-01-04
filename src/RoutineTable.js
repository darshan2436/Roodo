function RoutineTable({routines , frequency  , handleCheckboxChange, handleDelete}) {
    
    return (
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
              .filter((routine) => routine.frequency === frequency)
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
    )
}

export default RoutineTable;