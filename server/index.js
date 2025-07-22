// Import the express framework for building web servers
const express = require('express');
// Import the cors middleware to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Create an instance of an Express application
const app = express();
// Define the port number the server will listen on
const PORT = 5001;

// Enable CORS for all routes (allows requests from other origins)
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());

// Define a GET endpoint at /api/message
// When a GET request is made to /api/message, respond with a JSON object
app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

// Start the server and listen on the specified port
// When the server starts, log a message to the console
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});