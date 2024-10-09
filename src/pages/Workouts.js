import { useEffect, useState, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../UserContext';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Workouts() {

	const { user } = useContext(UserContext); 
	const [workouts, setWorkouts] = useState([]);

    useEffect(() => {

        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts', {
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		})
		.then(res => res.json())
		.then(data => {
		    if (typeof data.message !== "string") {
		    	setWorkouts(data.workouts);
		    } else {
		    	setWorkouts([]);
		    }
		});

    }, []);

	return(
		<>
            {
            	user
                ?
                    workouts.length > 0
                    ?
                    <>  
                        <h1 className='text-center mt-5'>Workouts</h1>
                        <Row> 
                            {   
                                workouts.map(workout => { 
                                    return (
                                        <Col md={3} key={workout._id}>
                                            <WorkoutCard workout={workout} />
                                        </Col>
                                    )
                                })
                            }   
                        </Row>
                    </>
                    :
                    <>
                        <h1>No Workouts Found</h1>
                    </>
                :
                <>
                    <h1>You are not logged in</h1>
                    <Link className="btn btn-primary" to={"/login"}>Login to View</Link>
                </>
        	}
        </>
	)
}
