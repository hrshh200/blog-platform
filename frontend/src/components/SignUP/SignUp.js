import React, { useState } from 'react';
import './SignUp.css';
import Modal from '../Modal/Modal'; // Import the Modal component

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
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Handle success
                console.log('API Response:', result);
                setApiResponse(result.message || 'Signup successful!'); // Set the message from the response
                setIsModalOpen(true); // Open the modal after successful submission
            } else {
                // Handle server errors
                console.error('Error:', result);
                setApiResponse(result.message || 'Signup failed. Please try again.');
                setIsModalOpen(true); // Open the modal to show error
            }
        } catch (error) {
            console.error('Network error:', error);
            setApiResponse('Network error. Please try again.');
            setIsModalOpen(true); // Open the modal to show error
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
            <Modal isOpen={isModalOpen} onClose={closeModal} message={apiResponse}/>
        </div>
    );
};

export default Signup;
