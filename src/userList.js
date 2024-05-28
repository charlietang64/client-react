import React, { useState, useEffect } from 'react';
import './userlist.css';
import axios from 'axios';

/**
 * UserList Component
 * 
 * This component fetches and displays a list of users from a given API endpoint. It also provides functionality to delete users.
 * 
 * State Variables:
 * - users: An array of user objects fetched from the API.
 * 
 * Functions:
 * - fetchUsers: Fetches the list of users from the API and updates the `users` state.
 * - deleteUser: Sends a request to delete a user by ID from the main API and updates the user list if the deletion is successful.
 * - deleteOtherUser: Sends a request to delete a user by ID from another API and updates the user list if the deletion is successful.
 * 
 * useEffect:
 * - Calls `fetchUsers` on component mount to load the initial user data.
 * 
 * Usage:
 * ```
 * <UserList />
 * ```
 * 
 * Notes:
 * - The component assumes that the APIs respond with a list of users in the `data` field.
 * - It also assumes that each user object contains the following fields: id, username, email, first_name, and last_name.
 * - The delete functionality will not delete users with the username 'admin'.
 * 
 */

const UserList = () => {
    const [users, setUsers] = useState([]);

    /**
     * Fetches the list of users from the API and updates the `users` state.
     */
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://chat-app-v84a.onrender.com/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /**
     * Sends a request to delete a user by ID from the main API and updates the user list if the deletion is successful.
     * 
     * @param {string} id - The ID of the user to delete.
     */
    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`https://chat-app-v84a.onrender.com/users/${id}`);
            
            if (response.status === 200) {
                fetchUsers(); // Refresh the user list after successful deletion
                console.log('User deleted successfully');
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    /**
     * Sends a request to delete a user by ID from another API and updates the user list if the deletion is successful.
     * 
     * @param {string} id - The ID of the user to delete.
     */
    const deleteOtherUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/other-users/${id}`);
            
            if (response.status === 200) {
                fetchUsers(); // Refresh the user list after successful deletion
                console.log('User deleted successfully');
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Delete</th> 
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>
                                {user.username !== 'admin' && (
                                    <button 
                                        onClick={() => deleteUser(user.id)} 
                                        onClickCapture={() => deleteOtherUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;