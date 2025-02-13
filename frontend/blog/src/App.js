import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/posts/")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/posts/", { title, content });
    setTitle("");
    setContent("");
    window.location.reload(); // Refresh to see new post
  };

  return (
    <div className="container">
      <h1>Oliver.Wanjala</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="oliver.wanjala" value={title} 
          onChange={(e) => setTitle(e.target.value)} required
        />
        <textarea 
          placeholder="python-programming" value={content} 
          onChange={(e) => setContent(e.target.value)} required
        />
        <button type="submit">welcome to greatness</button>
      </form>

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
