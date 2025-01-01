import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
        <Link to="/"><img className='w-20' src="https://i.ibb.co/1z5jFTg/Black-White-Elegant-Monogram-Initial-Name-Logo.png" alt="Black-White-Elegant-Monogram-Initial-Name-Logo"/></Link>
    </nav>
  );
}

export default Navbar;