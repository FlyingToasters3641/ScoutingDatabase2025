import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
const [posts, setPosts] = useState([]);

useEffect(() => {
//axios.get('https://jsonplaceholder.typicode.com/posts')
axios.get('http://localhost:3001/users')
.then(response => setPosts(response.data))
.catch(error => console.error('Error fetching data:', error));
}, []);

return (
    <div className="App">
        <h1>Name of the posts</h1>
        <ul>
        {posts.map(post => (
            <li key={post.id}>{post.title}</li>
        ))}
        </ul>
    </div>
    );
};

export default UserList;