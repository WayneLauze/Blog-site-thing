
import { Outlet } from 'react-router-dom';


// creates a frame for the postlist and postfetcher components
function Posts() {

    return (
      <div className="fade-in" style={{ padding: 20 }}>
        
        <h2>Posts</h2>
        <Outlet />
      </div>
     
    );
  }

export default Posts;