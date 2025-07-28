import { useState, useEffect } from 'react';

function App() {
    // State to hold posts and form inputs
    const [posts, setPosts] = useState([]); // For displaying posts
    const [title, setTitle] = useState(''); // Form input: title
    const [content, setContent] = useState(''); // Form input: content

    // Fetch posts from backend when page loads
    useEffect(() => {
        fetch('http://localhost:5000/api/posts') // GET request to backend
            .then(res => res.json()) // Convert response to JSON
            .then(data => setPosts(data)); // Store posts in state
    }, []);

    // Handle form submission to add new post
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        fetch('http://localhost:5000/api/posts', {
            method: 'POST', // Tell backend we're creating new data
            headers: { 'Content-Type': 'application/json' }, // Send JSON
            body: JSON.stringify({ title, content }) // Form data to send
        })
        .then(res => res.json()) // Get saved post back from backend
        .then(newPost => setPosts(prev => [...prev, newPost])); // Add new post to existing posts
    };

    return (
        <div>
            <h1>My Blog</h1>

            {/* Form to create a new post */}
            <form onSubmit={handleSubmit}>
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                />
                <button type="submit">Add Post</button>
            </form>

            {/* Display list of posts */}
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
