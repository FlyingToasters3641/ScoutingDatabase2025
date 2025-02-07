import { Container, Row, Col } from "react-bootstrap";
import BackButton from '../common/BackButton';

const Admin = () => {
    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}> 
                    <h1>Admin</h1>
                </Col>
                <hr></hr>
            </Row>
        </Container>
    );
}

export default Admin;