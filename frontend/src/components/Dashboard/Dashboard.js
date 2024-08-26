import React from 'react';
import Header from './Header';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
    return (
        <div className="dashboardContainer">
            <Header />
            <main className="mainContent">
                <h1>Welcome to my Blogging Platform!</h1>
                <p>This is a blogging platform where users can make their own account and can add, create, delete and update all their blog posts at free of costs!  </p>
                <div className='btnDisplay'>
                    <button>Sign up</button>
                    <button>Login</button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
