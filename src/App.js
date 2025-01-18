import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Routine from './Routine';
import Todo from './Todo';
import AddTodo from './AddTodo';
import AddRoutine from './AddRoutine';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Profile from './Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user')? true : false);


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <Home 
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />} />
          <Route path="/login" element={
            <Login
              isLoggedIn={isLoggedIn}
            />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/todo/add" element={<AddTodo />} />
          <Route path="/routine/add" element={<AddRoutine />} />
          <Route path='/profile' element={
            <Profile 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
