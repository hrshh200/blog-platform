import React, { useState } from 'react';
import axios from 'axios';
import './UpdateModal.css';
import ShowModal from '../Modal/Modal';

const Modal = ({ show, onClose, username }) => {
    // Move useState outside of the conditional
    const [formData, setFormData] = useState({
        username: username,
        img_url: '',
        place: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    // If show is false, return null immediately
    if (!show) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleclose = () => {
        onClose();
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/updateBlog', formData, {
                headers: {
                    'Content-Type': 'application/json', // JSON is usually used, not multipart/form-data unless files are being uploaded
                },
            });
            if (response.status === 200) {
                setApiResponse(response.message || 'Updated successfully!');
                setIsModalOpen(true);
            }
            // Close the modal after successful submission

            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update Blog</h2>
                <form onSubmit={handleSubmit} className='form-group'>
                    <label htmlFor="img_url">Image URL: </label>
                    <input
                        type="text"
                        id="img_url"
                        name="img_url"
                        value={formData.img_url}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="place">Place:</label>
                    <input
                        type="text"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        required
                    />
                    <input className='modalbutton' type="submit" value="Submit" />
                    <input onClick={handleclose} className='modalbutton' type="submit" value="Cancel" />
                </form>
            </div>
            {isModalOpen && <ShowModal isOpen={isModalOpen} onClose={closeModal} message={apiResponse} />}
        </div>
    );
};

export default Modal;
