import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>BLOG STUDIO</h1>
            <nav>
                <ul>
                    <li><a href="#dashboard">Login</a></li>
                    <li><a href="#dashboard">About</a></li>
                    <li><a href="#about">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;