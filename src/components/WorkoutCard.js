import { Card, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useState } from 'react';

export default function WorkoutCard({ workout }) {
    const { _id, name, duration, status, dateAdded } = workout;
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedDuration, setUpdatedDuration] = useState(duration);

    // Toggle Edit Modal
    const handleEditModal = () => setShowEditModal(!showEditModal);

    // Update only `name` and `duration`
    function updateWorkout() {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${_id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: updatedName,
                duration: updatedDuration
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Workout updated successfully") {
                Swal.fire({
                    icon: "success",
                    title: "Workout Updated",
                });
                window.location.reload(); // Reload to reflect changes
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error Updating Workout",
                    text: data.message
                });
            }
        })
        .catch(error => console.error("Error updating workout:", error));
        handleEditModal(); // Close the modal
    }

    // Mark workout as complete
    function completeWorkoutStatus(id) {

            fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${_id}`,{

            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if (data.error === "Failed to update the workout status") {

                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful workout status update",
                    text: data.message

                })

            } else {

                Swal.fire({

                    icon:"success",
                    title: "Status Updated"

                })

                window.location.reload() 
            }

        })
    }

    // Delete workout
    function deleteWorkout() {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${_id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Workout deleted successfully") {
                Swal.fire({
                    icon: "success",
                    title: "Workout Deleted",
                });
                window.location.reload(); // Reload to refresh workout list
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error Deleting Workout",
                    text: data.message
                });
            }
        })
        .catch(error => console.error("Error deleting workout:", error));
    }

    return (
        <>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>Duration:</Card.Subtitle>
                    <Card.Text>{duration} mins</Card.Text>
                    <Card.Subtitle>Status:</Card.Subtitle>
                    <Card.Text>{status}</Card.Text>
                    <Card.Subtitle>Date Added:</Card.Subtitle>
                    <Card.Text>{new Date(dateAdded).toLocaleDateString()}</Card.Text>             
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around">
                    <Button variant="primary" size="sm" onClick={handleEditModal}>Edit</Button>
                    <Button variant="success" size="sm" onClick={completeWorkoutStatus}>Complete</Button>
                    <Button variant="danger" size="sm" onClick={deleteWorkout}>Delete</Button>
                </Card.Footer>
            </Card>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={updatedName} 
                                onChange={(e) => setUpdatedName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration (in minutes)</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={updatedDuration} 
                                onChange={(e) => setUpdatedDuration(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModal}>Cancel</Button>
                    <Button variant="primary" onClick={updateWorkout}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
