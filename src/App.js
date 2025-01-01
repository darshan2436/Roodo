import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Routine from './Routine';
import Todo from './Todo';
import AddTodo from './AddTodo';
import AddRoutine from './AddRoutine';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/"><img className='w-20' src="https://i.ibb.co/1z5jFTg/Black-White-Elegant-Monogram-Initial-Name-Logo.png" alt="Black-White-Elegant-Monogram-Initial-Name-Logo"/></Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/todo/add" element={<AddTodo />} />
          <Route path="/routine/add" element={<AddRoutine />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
