import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './usercontext';
import { useNavigate } from 'react-router-dom';



// uuden postauksen määrittely: 
  // käyttäjän ohjaaminen navigaatiolla 
  // otsikon määritely ja asettaminen 
  // kuvauksen määritely ja asettaminen
  // käyttäjäkontekstin määrittely tiedostosta usercontext.js


function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useContext(UserContext);
    

// käyttäjän tarkistmainen ja ohjaaminen navigaatiolla
    if (!user ) {
      return <Navigate to="/login" replace />;
    }


// slugin tuottaminen otsikosta
    // muunnetaan pieniksikirjaimiksi, korvataan välit ' - ' -merkeillä 
    // ja poistetaan kaikki muut merkit kuin a-z ja 0-9
  function generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }


// uuden postauksen tallentaminen, ajetaan kun postaus lähetetään.
    // otsikko, kuvaus ja slug tallennetaan muuttujiin
  async function handleSubmit(event) {
  event.preventDefault();
  const slug = generateSlug(title);
  const post = { title, description, slug };
  
 

  
  
  

  // lähetetään postaus palvelimelle 

  const response = await fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  // jos onnistuu, tulostetaan konsoliin onnistumisviesti ja postaus
  if (response.ok) {
    console.log('Post saved successfully!');
    console.log(post);

    //tyhjennetään lomake ja ohjataan käyttäjä tekemäänsä postaukseen
      setTitle('');
      setDescription('');
      navigate(`/posts/${slug}`);
  

  // jos ei onnistu, tulostetaan konsoliin virheviesti
  } else {
    console.error('Error saving post');
  }
}


// uuden postauksen lomake
  return (
    
    <div className="post fade-in" style={{ padding: 20 }}>
  
      
    <form onSubmit={handleSubmit}>
      <label> 
        Title:
        </label><br/>
        
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '400px'  }} />
      
      <br/>
      <br />
      
      <label>
        Description: 
        </label><br/>
        
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ height: '200px', width: '550px' }} />
      
      <br />
      <br />
      
      <button type="submit">Save</button>
    </form>
    </div>
  );
}

export default NewPost;
