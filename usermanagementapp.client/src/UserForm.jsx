import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [users, setUsers] = useState([]); // Initialize users as an empty array
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    // Function to fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:7249/api/users'); // Adjust the URL as needed
            setUsers(response.data); // Ensure response.data is an array
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = { Username: Username, Password: Password };
            await axios.post('http://localhost:7249/api/users', newUser);
            fetchUsers(); // Refresh the user list after adding a new user
            setUsername(''); // Clear the input field
            setPassword(''); // Clear the input field
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleEdit = (user) => {
        setUsername(user.Username);
        setPassword(user.Password);
        setId(user.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.Username}
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserForm;