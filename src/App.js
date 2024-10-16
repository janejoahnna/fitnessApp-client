import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Error from './pages/Error';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import AddWorkout from './pages/AddWorkout';


import './App.css';
import { UserProvider } from './UserContext';

function App() {
    const [user, setUser] = useState({
      id: null,
      isAdmin: false
    });

    // Clears the local storage and resets the user state
    const unsetUser = () => {
      localStorage.clear();
      setUser({
        id: null,
        isAdmin: false
      });
    };

    // Check token existence on component mount
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // Assume user is logged in if token exists (can add additional checks if needed)
        setUser({
          id: "dummyUserId",  // Use a placeholder or handle actual user details here
          isAdmin: false  // Set based on your application's requirements
        });
      } else {
        unsetUser();
      }
    }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addWorkout" element={<AddWorkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
