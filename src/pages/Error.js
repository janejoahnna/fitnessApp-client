import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <Row>
            <Col className="mt-5 pt-5 text-center mx-auto">
                <h1>404 Error</h1>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <Link className="btn btn-primary" to={"/"}>Back to Home</Link>
            </Col>
        </Row>
    );
}
