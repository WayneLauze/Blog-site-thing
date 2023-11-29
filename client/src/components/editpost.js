import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './usercontext';
import { useContext } from 'react';




function EditPost() {
  const { user } = useContext(UserContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error] = useState(null);
  const [loading, setLoading] = useState(true);


 
 // if not logged in, redirect to login page
  useEffect(() => {
    if (!user) {
        navigate ("/login" ,{ replace: true });
        return;
      } 


   // use slug to fetch the post from the server
     // and use slug as url parameter
    const fetchPost = async () => {
      const response = await fetch(`/posts/${slug}`);
      const data = await response.json();
      setPost(data);
      setLoading(false);

      

    };
 
    fetchPost();
  }, [slug, user, navigate]);


 // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`/posts/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: post.title, description: post.description }),
    });

    // if the post was updated successfully,
    // redirect to the updated post
    if (response.ok) {
        navigate(`/posts/${slug}`);
      }  else {
        console.error('Failed to update post');
      }
  };


  if (loading) {
    return <div style= {{ padding : 50 }}>
    <span>Loading...</span> </div>
  }
  
  if (error) {
      return <span>{error}</span>;
  }
  
  if (!post) {
      return <span>Loading...</span>;
  }

 

// form to edit the post
  return (
   
    <div className="post fade-in" style={{ padding: 20 }}>
  
      
    <form onSubmit={handleSubmit}>
      <label> 
        Title:
        </label><br/>
        
        <input type="text" value={post.title} onChange={e => setPost({ ...post, title: e.target.value })}  style={{  width: '400px' }} />
      
      <br/>
      <br />
      
      <label>
        Description: 
        </label><br/>
        
        <textarea value={post.description} onChange={e => setPost({ ...post, description: e.target.value })} style={{height: '200px', width: '550px' }} />
      
      <br />
      <br />
      
      <button type="submit">Save</button>
    </form>
    </div>
);
  
}

export default EditPost;