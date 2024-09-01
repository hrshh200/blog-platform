
const mongoose = require('mongoose');
const { Schema } = mongoose;


const blogsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    collection: 'blogs' 
});

// Create a model from the schema
const Blogs = mongoose.model('blogs', blogsSchema);

module.exports = Blogs;
