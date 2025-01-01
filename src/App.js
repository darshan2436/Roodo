import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Routine from './Routine';
import Todo from './Todo';
import AddTodo from './AddTodo';
import AddRoutine from './AddRoutine';
import Navbar from './Navbar';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
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
