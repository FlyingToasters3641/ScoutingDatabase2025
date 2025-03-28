import { Container, Row, Col } from "react-bootstrap";
import BackButton from '../common/BackButton';

const Admin = () => {
    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}> 
                    <h1>Hamburger Menu</h1>
                </Col>
                <hr></hr>
            </Row>
            <Row>
                <Col md={12}>
                    <h2>Settings</h2>
                    <hr></hr>
                </Col>
                <Col md={4}>
                    <h3>App Information</h3>
                    <hr></hr>
                    <p>Flying Toasters ScoutDB Version: 2025.1.0</p>
                    <p>Most Recent Server Model Version: 2025-v3</p>
                    <p>Powered By <a href="https://www.thebluealliance.com/" target="_blank" rel="noopener noreferrer">The Blue Alliance</a></p>
                </Col>
                <Col md={4}>
                    <h3>Compatible Years</h3>
                    <hr></hr>
                    <p>Reefscape ~ 2025</p>
                </Col>
                <Col md={4}>
                    <h3>Contributors</h3>
                    <hr></hr>
                    <p>ck2424</p>
                    <p>Jacobk12345</p>
                    <p>chase234568</p>
                    <p>JackSlisher1234</p>
                    <p>Divith-N</p>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h2>Admin</h2>
                    <hr></hr>
                </Col>
                <Col md={6}>
                    <h3>Events</h3>
                    <hr></hr>
                </Col>
                <Col md={6}>
                    <h3>Teams</h3>
                    <hr></hr>
                </Col>
            </Row>
        </Container>
    );
}

export default Admin;