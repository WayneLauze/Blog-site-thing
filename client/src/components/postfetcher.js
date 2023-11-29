import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './usercontext';
import '../App.css';



// function to fetch a single post from the server
// and display it on the page

function PostFetcher() {
  const { user } = useContext(UserContext);
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      

      
      setIsLoading(true);
      const response = await fetch(`/posts/${slug}`);
     
      if (!response.ok) {
        console.error('Error fetching post', response.status, response.statusText);
        return;
      }
      const post = await response.json();
      setPost(post);
      setIsLoading(false);
    }

    fetchPost();
  }, [slug]);

  if (isLoading) {
        
    return  <div className={`fade-in`} style={{ padding: 20 }}></div>;
  
  } 

// function to delete a post
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const response = await fetch(`/posts/${slug}`, { method: 'DELETE' });
      console.log('Response status:', response.status);
      console.log('Response message:', await response.text());
      if (response.ok) {
        console.log("post deleted succesfully")
      } else {
        console.log('Error deleting post')
      }
      navigate ('/posts')
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${post.slug}`);
  };




// display the post
 // wait for the post to be fetched from the server before rendering
 // allowing smooth transition from home to post view
  return (

    
    
    <div className={`fade-in ${post > 0 ? 'loaded' : ''}`} style={{ padding: 20 }}>
      
      <div style = {{ padding : 20 }}>
      <h1>{post.title} </h1>
      <div style = {{ fontSize : 4 |  4 | 7 }}>
      
      {user && (
      <div>
      <button onClick={handleDelete}>Delete</button>
      <span> </span>
      <button onClick={handleEdit}>Edit</button>
      </div> )}
      
      </div>
      </div>
      
      <div  style = {{padding : 20 }}> 
      
      {new Date(post.date).toLocaleDateString('fin', 
      { year: 'numeric', month: 'long', day: 'numeric' })}  
      
      </div> 
      <br />
      <br />
      <div className={`fade-in ${post.description ? 'loaded' : ''}`} style={{ padding: 20 }}>
      <p style={{ whiteSpace: 'pre-wrap' }}>{post.description}</p>
      </div>

    </div>
      
  );
}

export default PostFetcher;