import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {
        e.preventDefault();

        fetch('https://fitnessapp-api-ln8u.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem('token', data.access);
                setUser({ id: data.userId });
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome back!"
                });
                navigate('/');
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again."
                });
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred. Please try again later.",
                icon: "error"
            });
        });

        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    return (
        (user && user.id) ? (
            <Navigate to="/" />
        ) : (
            <Form onSubmit={authenticate}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                { isActive ? 
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    : 
                    <Button variant="danger" type="submit" disabled>
                        Submit
                    </Button>
                }
            </Form>
        )
    );
}
