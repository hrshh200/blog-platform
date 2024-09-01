import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './Login.css';
import Modal from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [apiResponse, setApiResponse] = useState(null); // To store response message
    const [isModalOpen, setIsModalOpen] = useState(false); // For displaying the modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data;

            if (response.status === 200) {
                const username = result.user.username; // Extract the username from the response
                setApiResponse(result.message || 'Login successful!');
                
                // Navigate to the /section route and pass the username as a parameter
                navigate(`/section?username=${username}`);
            } else {
                console.error('Error:', result);
                setApiResponse(result.message || 'Login failed. Please try again.');
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setApiResponse(error.response?.data?.message || 'Network error. Please try again.');
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div id="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input type="submit" value="Submit" />
            </form>

            {/* Render the Modal */}
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} message={apiResponse} />}
        </div>
    );
};

export default Login;
