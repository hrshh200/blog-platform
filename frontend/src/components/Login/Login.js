import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();     
        //Setting the form data to the backend, and API will be called here
        console.log('Form Data:', formData);
    };

    return (
        <div id="login-form">
            <h1>Login</h1>
            <form>
                <label htmlFor="password">Email:</label>
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
                <input type="submit" value="Submit" onSubmit={handleSubmit} />
            </form>
        </div>
    );
};

export default Login;
