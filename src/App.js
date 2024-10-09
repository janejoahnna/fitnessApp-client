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

    // Fetch user details on component mount to maintain logged-in state
    useEffect(() => {
      fetch(`https://fitnessapp-api-ln8u.onrender.com/users/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
        } else {
          unsetUser();
        }
      })
      .catch(() => unsetUser());
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
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/addWorkout" element={<AddWorkout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
