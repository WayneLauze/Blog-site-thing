import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './usercontext';




function Login() {

    const { setUser } = useContext(UserContext);
    const [creds, setCreds] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
// handle form submission for login
    async function handleLogin() {
        const { username, password } = creds;


        // send the username and password to the server
        // in model user.js, the password is hashed there before saving to the database
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        // if the credentials are valid, the user will be logged in
        if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log("logged in as " + username)
            navigate('/');
        } else {
            setError('Error logging in');
        }
    }

// handle form submission for registration    
    async function handleRegister() {
        const { username, password } = creds;

        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            console.log('User registered');
            handleLogin(); // Automatically log in the user after registration
        } else {
            setError('Error registering user');  // TODO: handle errors better
        }
    }
    
    // login and registration form, some CSS done here due single use of centering elements
    return (
        <div className="post fade-in" style={{ 
            padding: 10, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column' 
          }}>
            {error && <div>{error}</div>}
            <span>Username: </span><br/>
            <input 
            type = "text"
            onChange={(e) => setCreds({...creds, username: e.target.value})}/><br/>
            <span>Password: </span><br/>
            <input
            type='password'
            onChange={(e) => setCreds({...creds, password: e.target.value})}/><br/>
        <div><button onClick={handleLogin}>Login</button> 
        <span> </span>
            <button onClick={handleRegister}>Register</button></div>
        </div>
        
    );
}

export default Login;