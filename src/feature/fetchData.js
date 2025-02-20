import axios from "axios";

 export  default async function  fetchData( address , email , setData , setLoading , setError){
    //fetch the api url from .env
    const API_URL = "https://roodobackend-production.up.railway.app/api";
    try {
      const response =  await axios.get(`${API_URL}/${address}`, {
        params: { 
          email : email},
      });
      if(!response){
        throw new Error("No response from the server");
      }
      setData(response.data);
    } catch (err) {
      setError(err.message + " in database" || `Failed to fetch ${address}. Please try again.`);
    } finally{
      setLoading(false);
    }
};