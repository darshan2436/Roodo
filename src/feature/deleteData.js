import axios from "axios";

export default async function handleDeleteData(id , address , setData ,datas , setError ){
    const API_URL = "https://roodobackend-production.up.railway.app/api";
    const confirm = prompt("Are you sure you want to delete the row press y/Y to confirm:");
    
    if (confirm === 'y' || confirm === 'Y') {	
      try {
        await axios.delete(`${API_URL}/${address}/${id}`);
        setData(datas.filter((data) => data._id !== id));
        alert("Data deleted successfully!");
      } catch (err) {
        console.error("Error deleting todo:", err);
        setError("Failed to delete todo. Please try again.");
      }
    } else {
        alert("Routine deletion cancelled.");
    }
}