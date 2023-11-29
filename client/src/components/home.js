import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [loading, setLoading] = useState(true);


  // fetch all posts from the server
  // and sort them by date
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/posts');
      const data = await response.json();
      setPosts(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // pagination of posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  
  return (
    <div className={`homepost ${posts.length > 0 ? 'loaded' : ''}`} style={{ padding: 20 }}>
      <h2>Home View</h2>
      <br />
      {currentPosts.map(post => (
        <div key={post.slug}>
          <h3>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </h3>
          <p>{new Date(post.date).toLocaleDateString()}</p>
          <p>{post.description.substring(0, 200)} ... </p>
          <br />
          <br />
        </div>
      ))}
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>Next</button>
      <p>Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}</p>
    </div>
  );
}

export default Home;