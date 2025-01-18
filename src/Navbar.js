import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

function Navbar() {
  const email = localStorage.getItem('email');
  return (
    <nav className='flex justify-between'>
        <Link to="/"><img className='w-20' src="https://i.ibb.co/1z5jFTg/Black-White-Elegant-Monogram-Initial-Name-Logo.png" alt="Black-White-Elegant-Monogram-Initial-Name-Logo"/></Link>
        <Link to='/profile' className='flex m-2'><User className="size-8 border border-black rounded-2xl text-gray-400" />{email}</Link>
    </nav>
  );
}

export default Navbar;