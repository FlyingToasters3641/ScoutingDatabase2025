import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);

  //const baseUrl = process.env.NEXT_STATIC_BASE_URL || "http://localhost:3001";
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001/api'
  
  useEffect(() => {
  //axios.get('https://jsonplaceholder.typicode.com/posts')
  //axios.get('http://localhost:3001/users')
  axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/users')
  .then(response => setPosts(response.data))
  .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return (
      <div className="App">
          <h1>Name of the posts</h1>
          <ul>
          {posts.map(post => (
              <li key={post.id}>{post.name} - {post.email}</li>
          ))}
          </ul>
      </div>
      );
  };

export default App