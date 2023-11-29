import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './usercontext';
import { useEffect, useState } from 'react';





// Aiheiden listaus 
function PostLists() {
const  { user } = useContext(UserContext);
const [posts, setPosts] = useState([]);


// fetch all posts from the server
useEffect(() => {
  async function fetchPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();
    setPosts(posts);
  }

  fetchPosts();
}, []);


// sort posts by date (oldest first) and display them as a list 
// use title as link to the post
    return (
      <div className={`homepost ${posts.length > 0 ? 'loaded' : ''}`} style={{ padding: 20 }}>
      <ul>
        
        
        {user && (
        <p> <Link to="/newpost">New Post</Link> </p> 
      )}
        <br />
        <div>
          {posts.map(post => (
        <div key={post._id}>
        <Link to={`/posts/${post.slug}`}>
              <li key={post.title} > 
                  <r>
                      {new Date(post.date).toLocaleDateString('fin', 
                      { year: '2-digit', month: 'numeric', day: 'numeric' })} | {post.title} 
                  </r>
              </li>
              <br />
      </Link>
  </div>
))}
    </div>
      </ul>
      </div>
    );
  }

export default PostLists;