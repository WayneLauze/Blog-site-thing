import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import NoMatch from './components/404';

import Posts from './components/posts';
import PostLists from './components/postlists';
import PostFetcher from './components/postfetcher';
import Login from './components/login';
import Stats from './components/stats';


import NewPost from './components/newpost';
import { UserProvider, UserContext } from './components/usercontext';
import EditPost from './components/editpost';

// Navigation bar
function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    
  // handle logout
    function logOut() {
      fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include', // This sends the session cookie
      })
      .then(response => {
        if (response.ok) {
          setUser(null);
          navigate('/');
          console.log("logged out")
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => console.error('Error:', error));
    }

  // display the navigation bar
    return (
        <nav style={{ margin: 10 }}>
        <Link to ="/" style = {{ padding : 5}}>
            Home
        </Link>
        <Link to ="/posts" style = {{ padding : 5}}>
            Posts
        </Link>
        <Link to ="/about" style = {{ padding : 5}}>
            About
        </Link>
        <span> | </span>
        {user && <Link to ="/stats" style = {{ padding : 5}}>
            Stats   
        </Link>}
        {!user && <Link to ="/login" style = {{ padding : 5}}>
            Login  
        </Link>}
        { user && <span onClick ={logOut} style={{ padding: 5, cursor: 'pointer' }}>
            Logout
        </span> }
    </nav>
    
    );
  }

  // UserProvider is used to provide the user context to the app
  function App() {
    return (
      <UserProvider>
        <AppContent />
      </UserProvider>
    );
  }

  // AppContent contains the routes for the app
function AppContent() {
    
    const { user, setUser } = useContext(UserContext);


  return(
    <UserProvider>
        <NavBar user={user} setUser={setUser} />
     <>
     
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/posts" element={<Posts />}>
              <Route index element ={<PostLists /> } />
              <Route path="/posts/:slug" element={<PostFetcher /> } />
          </Route>
          <Route path="/about" element ={<About /> } />
          <Route path="/newpost" element ={<NewPost /> } />
          <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/stats" element={<Stats user={user} />} />
        <Route path="/edit/:slug" element={<EditPost user={user} />} />
          <Route path="*" element={<NoMatch /> } />
        </Routes>
        </>
      </UserProvider>
     
     
      
  );
}



export default App;