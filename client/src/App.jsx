import { useState, useEffect } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Card from './components/Card';

function App() {
    // State to hold posts and form inputs
    const [posts, setPosts] = useState([]); // For displaying posts
    const [title, setTitle] = useState(''); // Form input: title
    const [content, setContent] = useState(''); // Form input: content
    const [isLoading, setIsLoading] = useState(true);

    // Fetch posts from backend when page loads
    useEffect(() => {
        fetch('http://localhost:5000/api/posts') // GET request to backend
            .then(res => res.json()) // Convert response to JSON
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching posts:", err);
                setIsLoading(false);
            });
    }, []);

    // Handle form submission to add new post
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        if (!title.trim() || !content.trim()) return;

        fetch('http://localhost:5000/api/posts', {
            method: 'POST', // Tell backend we're creating new data
            headers: { 'Content-Type': 'application/json' }, // Send JSON
            body: JSON.stringify({ title, content }) // Form data to send
        })
            .then(res => res.json()) // Get saved post back from backend
            .then(newPost => {
                setPosts(prev => [...prev, newPost]); // Add new post to existing posts
                setTitle('');
                setContent('');
            });
    };

    return (
        <div className="container">
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(to right, #fff, #a5a5a5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    Neon<span style={{ color: 'var(--primary-color)', WebkitTextFillColor: 'initial' }}>Blog</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Share your thoughts with the world.
                </p>
            </header>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Form to create a new post */}
                <Card>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Create New Post</h2>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter an interesting title..."
                        />
                        <Input
                            type="textarea"
                            label="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's on your mind?"
                            rows={6}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" disabled={!title || !content}>
                                Publish Post
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Display list of posts */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', marginLeft: '0.5rem' }}>
                        Recent Posts
                    </h2>

                    {isLoading ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading posts...</p>
                    ) : posts.length === 0 ? (
                        <Card>
                            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                No posts yet. Be the first to write something!
                            </p>
                        </Card>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {posts.map((post, index) => (
                                <Card key={post.id} hoverEffect={true} delay={index * 0.1}>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        marginBottom: '0.8rem',
                                        color: 'var(--primary-color)'
                                    }}>
                                        {post.title}
                                    </h3>
                                    <p style={{
                                        lineHeight: '1.6',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {post.content}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
