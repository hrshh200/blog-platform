const express = require("express");
const app = express();
require("./models/dbconnect"); // Ensure this connects to your MongoDB

const User = require("./Schema/User"); // Import the User model
const Blogs = require("./Schema/Blogs");

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello Server here!!");
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Create a new user document using the User model
        const newUser = new User({
            username,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(200).json({ message: "Signup successful!", data: { username, email } });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: "Signup failed. Please try again." });
    }
});

app.post('/addBlog', async (req, res) => {
    const { username, img_url, place } = req.body;
    try {
        // Create a new user document using the User model
        const newBlog = new Blogs({
            username,
            img_url,
            place
        });

        // Save the new user to the database
        await newBlog.save();

        // Send a success response
        res.status(200).json({ message: "Signup successful!" });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: "Signup failed. Please try again." });
    }
});

app.post('/updateBlog', async (req, res) => {
    const { username, img_url, place } = req.body;
    try {
       
        const updatedBlog = await Blogs.findOneAndUpdate(
            { username: username }, // Filter by username
            { img_url: img_url, place: place }, // Fields to update
            { new: true, upsert: true } // Options: new returns the updated document, upsert creates a new doc if no match is found
        );

        if (updatedBlog) {
            res.status(200).json({ message: "Blog updated successfully!", updatedBlog });
        } else {
            res.status(404).json({ message: "Blog not found for the given username." });
        }
    } catch (error) {
        console.error('Error during blog update:', error);
        res.status(500).json({ message: "Blog update failed. Please try again." });
    }
});

app.post('/deleteBlog', async (req, res) => {
    const { username, img_url, place } = req.body; 
    try {
        // Find and delete the blog by matching username, img_url, and place
        const deletedBlog = await Blogs.findOneAndDelete({ username, img_url, place });

        if (deletedBlog) {
            res.status(200).json({ message: "Blog deleted successfully!", deletedBlog });
        } else {
            res.status(404).json({ message: "Blog not found with the provided details." });
        }
    } catch (error) {
        console.error('Error during blog deletion:', error);
        res.status(500).json({ message: "Blog deletion failed. Please try again." });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            // Optionally, generate a token or session here
            res.status(200).json({ message: 'Login successful!', user: { username: user.username, email: user.email } });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
});

app.post('/find', async (req, res) => {
    const { username } = req.body;

    try {
        const blogs = await Blogs.find({ username }); // Assuming Blog.find returns an array
        res.status(200).json({ message: 'Blogs found!', blogs }); // Return blogs as an array
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is listening at port number ${port}`);
});
