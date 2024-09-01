import React, { useState } from 'react';
import './SignUp.css';
import Modal from '../Modal/Modal'; // Import the Modal component
import axios from 'axios';

const Signup = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

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
            const response = await axios.post('/signup', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = response.data;

            if (response.status === 200) {
                console.log('API Response:', result);
                setApiResponse(result.message || 'Signup successful!');
                setIsModalOpen(true);
            } else {
                console.error('Error:', result);
                setApiResponse(result.message || 'Signup failed. Please try again.');
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
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
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
            <Modal isOpen={isModalOpen} onClose={closeModal} message={apiResponse} />
        </div>
    );
};

export default Signup;
