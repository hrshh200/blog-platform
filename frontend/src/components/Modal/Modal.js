import React from 'react';
import './Modal.css'; // You'll need to style the modal
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, message}) => {

    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                <div className='modalButton'>
                    <button onClick={onClose}>OK</button>
                    <button
                        onClick={(e) => navigate('/login')}
                    >Login</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
