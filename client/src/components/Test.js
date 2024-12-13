import React, { useState, useEffect } from "react";
import axios from 'axios';

const Test = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    //axios.get('https://jsonplaceholder.typicode.com/posts')
    //axios.get('http://localhost:3001/users')
    //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/users')
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => setPosts(response.data))
    .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
        <h1>Name of the posts</h1>
        <ul>
          {posts.map(post => (
              <li key={post.id}>{post.title}</li>
          ))}
          </ul>
        </>
    );
}

//{post.id}>{post.name} - {post.email}

export default Test;