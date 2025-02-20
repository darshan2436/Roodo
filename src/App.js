import './assets/App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Home from './pages/Home/Home';
import Routine from './pages/routine/Routine';
import Todo from './pages/todo/Todo';
import AddTodo from './pages/todo/AddTodo';
import AddRoutine from './pages/routine/AddRoutine';
import Navbar from './components/ui/Navbar';
import NotFound from './components/ui/NotFound';
import Profile from './components/ui/Profile';

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
