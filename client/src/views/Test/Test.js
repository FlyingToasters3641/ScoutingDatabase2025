import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import BackButton from '../common/BackButton';

const Test = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => setPosts(response.data))
    .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}> 
                    <h1>Name of the posts</h1>
                    <ul>
                    {posts.map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Test;