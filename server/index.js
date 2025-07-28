const express = require('express'); // Import Express framework
const cors = require('cors'); // Allow frontend to access backend API

const app = express(); // Initialize Express app
const PORT = 5000; // Port to run the backend

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow backend to understand JSON requests

// Fake database: an array to store posts temporarily
let posts = [
    { id: 1, title: "First Post", content: "This is the first blog post." },
];

// Route: GET /api/posts
// Purpose: Send all blog posts to the frontend
app.get('/api/posts', (req, res) => {
    res.json(posts); // Respond with the posts array
});

// Route: POST /api/posts
// Purpose: Receive new blog post from frontend and add it to our "database"
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body; // Extract data from request body

    const newPost = {
        id: posts.length + 1, // Simple ID logic for demo
        title,
        content
    };

    posts.push(newPost); // Save new post to array (our fake database)
    res.status(201).json(newPost); // Respond to frontend with the saved post
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
