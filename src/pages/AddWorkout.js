import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddWorkout() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");

    function createWorkout(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        fetch('http://localhost:4000/workouts/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error === "Error in Save") {
                Swal.fire({
                    icon: "error",
                    title: "Unsuccessful Workout Creation",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Workout Added"
                });
                navigate("/workouts");
            }
        });

        setName("");
        setDuration("");
    }

    return (
        user.id ? (
            <>
                <h1 className="my-5 text-center">Add Workout</h1>
                <Form onSubmit={e => createWorkout(e)}>
                    <Form.Group>
                        <Form.Label>Workout Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Workout Name" 
                            required 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Duration (in minutes):</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Duration" 
                            required 
                            value={duration} 
                            onChange={e => setDuration(e.target.value)} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </>
        ) : (
            <Navigate to="/login" />
        )
    );
}
