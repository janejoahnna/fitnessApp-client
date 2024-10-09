import { useEffect, useState, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../UserContext';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Workouts() {
    const { user } = useContext(UserContext); 
    const [workouts, setWorkouts] = useState([]);

    // Define fetchData function here
    function fetchData() {
        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data.workouts)) {
                setWorkouts(data.workouts);
            } else {
                setWorkouts([]);
            }
        })
        .catch(error => console.error("Error fetching workouts:", error));
    }

    useEffect(() => {
        fetchData(); // Call fetchData when component loads
    }, []);

    return(
        <>
            {user ? (
                workouts.length > 0 ? (
                    <>  
                        <h1 className='text-center mt-5'>Workouts</h1>
                        <Row> 
                            {workouts.map(workout => ( 
                                <Col md={3} key={workout._id}>
                                    <WorkoutCard workout={workout} fetchData={fetchData} />
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <h1>No Workouts</h1>
                )
            ) : (
                <>
                    <h1>You are not logged in</h1>
                    <Link className="btn btn-primary" to={"/login"}>Login to View</Link>
                </>
            )}
        </>
    );
}
