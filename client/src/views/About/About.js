import { Container, Row, Col } from "react-bootstrap";
import BackButton from '../common/BackButton';

const About = () => {
    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}> 
                    <h1>About</h1>
                    <p>Version 0</p>
                </Col>
            </Row>
        </Container>
    );
}

export default About;