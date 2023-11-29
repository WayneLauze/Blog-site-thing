
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './usercontext';

   
// restrict access to the stats page to logged in users only
        function Stats() {
        const { user } = useContext(UserContext);

        if (user != null) {
            console.log("user is " + user.username)
          } else 
          console.log("user is " + user)

            if (!user) {
                return <Navigate to="/login" replace />;
            }

        return ( 
            console.log("user is " + user.username),
            <div className="post fade-in" style={{ padding: 20 }}>
                <h2>Stats View</h2>
                <p>Loreps ispsuit doolor sit amnettio ragerdosumtimus.</p>
            </div>
        );
    }

    export default Stats; 
