import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

function Navbar() {
  const [name , setName] = useState("");

  useEffect(()=>{
    const fetchName = async ()=>{
      const email = localStorage.getItem('email');
      if(email){
        try{
          const response = await fetch(
            "https://roodobackend-production.up.railway.app/api/auth/profile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({email: email})
            }
          )
          if(response.ok){
            const data = await response.json();
            setName(data.username);
          }
        } catch(error){
          console.error(error);
        }
      }
    }
    fetchName();
  },[])

  return (
    <nav className='flex justify-between'>
        <Link to="/"><img className='w-20' src="https://i.ibb.co/1z5jFTg/Black-White-Elegant-Monogram-Initial-Name-Logo.png" alt="Black-White-Elegant-Monogram-Initial-Name-Logo"/></Link>
        <Link to='/profile' className='flex m-2'><User className="size-8 border border-black rounded-2xl text-gray-400" /><p className="hidden md:block ">{name}</p></Link>
    </nav>
  );
}

export default Navbar;