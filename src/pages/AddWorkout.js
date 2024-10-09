import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddWorkout() {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
    const [duration, setDuration] = useState(0);

    function createWorkout(e) {
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {  // Corrected URL
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
            if (data.error === "Failed to save the workout") {
                Swal.fire({
                    icon: "error",
                    title: "Unsuccessful Workout Creation",
                    text: data.message
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
        setDuration(0);
    }

    return (
        (user.id)
            ? <>
                <h1 className="my-5 text-center">Add Workout</h1>
                <Form onSubmit={e => createWorkout(e)}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Duration (in minutes):</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Duration"
                            required
                            value={duration}
                            onChange={e => setDuration(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </>
            : <Navigate to="/workouts" />
    );
}
