import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Section.css";
import Modal from "../Modal/FormModal"; // Import the modal component
import UpdateModal from "../Modal/UpdateModal";
import { useLocation } from 'react-router-dom';

const Section = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to handle modal visibility
    const [showupdateModal, setShowUpdateModal] = useState(false);
    const [refresh, setRefresh] = useState(false); 

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.post('/find', { username });

                const blogsData = Array.isArray(response.data.blogs)
                    ? response.data.blogs
                    : [response.data.blogs];

                setBlogs(blogsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to load blogs. Please try again.');
                setLoading(false);
            }
        };

        if (username) {
            fetchBlogs();
        }
    }, [username, refresh]);

    const handleAddBlogClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateBlogClick = () => {
        setShowUpdateModal(true);
    };

    const handleupdateCloseModal = () => {
        setShowUpdateModal(false);
    };

    const handleDeleteBlogClick = async (img_url, place) => {
        try {
            const response = await axios.post('/deleteBlog', { username, img_url, place }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log("Deleted Successfully");
                setRefresh(prev => !prev);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };


    return (
        <div>
            <header className="header">
                <h1>Welcome {username}!</h1>
                <nav>
                    <ul>
                        <li><a href="/login">Logout</a></li>
                    </ul>
                </nav>
            </header>

            <div>
                <button className="button" onClick={handleAddBlogClick}>
                    Add Blogs
                </button>
            </div>

            <div className="blog-section">
                {loading ? (
                    <p>Loading blogs...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : blogs.length > 0 ? (
                    <div className="card-container">
                        {blogs.map((blog, index) => (
                            <div
                                key={index}
                                className="card"
                                style={{ backgroundImage: `url(${blog.img_url})` }}
                            >
                                <div className="align_content">
                                    <div className="card-content">
                                        <h2>{blog.place}</h2>
                                    </div>
                                    <div className="card-content">
                                        <div className="btnAlign">
                                        <button onClick={() => handleDeleteBlogClick(blog.img_url, blog.place)}>Delete</button>
                                            <button onClick={handleUpdateBlogClick}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No blogs found for {username}.</p>
                )}
            </div>

            {/* Modal for adding a blog */}
            <Modal show={showModal} onClose={handleCloseModal} username={username} />
            <UpdateModal show={showupdateModal} onClose={handleupdateCloseModal} username={username} />
        </div>
    );
};

export default Section;
