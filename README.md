            Wayne's  _     _                       _ _             _   _     _             
                    | |__ | | ___   __ _       ___(_) |_ ___      | |_| |__ (_)_ __   __ _ 
                    | '_ \| |/ _ \ / _` |_____/ __| | __/ _ \_____| __| '_ \| | '_ \ / _` |
                    | |_) | | (_) | (_| |_____\__ \ | ||  __/_____| |_| | | | | | | | (_| |
                    |_.__/|_|\___/ \__, |     |___/_|\__\___|      \__|_| |_|_|_| |_|\__, |
                                   |___/                                             |___/ v.0.7 
                                                                                    


a What? 
       
        Single-page-application, with its core being around posts made  
        by registered users, posts are shown fully or partly depending  
        on the page viewed.

        Users are saved with hashed passwords to database, 
        logins are managed with sessions stored an to database. 

        Created posts contain only text for now, 
        will include other media in the future. 

        Its not yet live, its not finished, not ready, but its something. 
        Work in progress. 

but Why?
        
        Mainly to learn code, usage of React, Node.js and MongoDB, as well as  
        to show something I have created, AND to create 
        a simple and flexible blog site for other usecases in the future. 
          
and How?
        
        With frustration, reading and excess help and explanation of component functions 
        from GitHub co-pilot, as well as tutorials and other recoureses on the web.
         




--- Frontend ---

    -- Components

      - App.js
                Frame for other functions to take place in. Defines Navbar shown at all times.
                Handles logout, defines routes to other functions within the application.
                
                It defines 'appcontent' within which 'usercontexts' is provided, to activate 
                aproperiate functionality for user in question.  

                Meaning 'if logged in: show stuff that is only for logged in users'    
                        
        ------------------------------------------------------------------------------

      - home.js  
                
                Shows all posts created in a list of titles as a link to the post.
                The first 200 charactes of the post is displayed. 

                Shows newest post first, lists 5 posts per page.  

        ------------------------------------------------------------------------------

      - postlists.js
      - postfetcher.js

      - posts.js 
                
                posts.js works as a frame for functions postlists.js and postfetcher.js to: 

                1) display list of titles in order of oldest to newest (postlists.js)
                2) to display the selected post with all its content. (postfetcher.js) 

        ------------------------------------------------------------------------------


      - editpost.js
      - newpost.js 
                
                User restricted pages to edit existing, and to create a new posts.

        ------------------------------------------------------------------------------


      - stats.js 
      - about.js      

                Restricted(stats.js) and unrestricted(about.js) pages for reasons unknown.

        ------------------------------------------------------------------------------


      - usercontext.js 
                
                Holds and provides the usercontext for other components 

        ------------------------------------------------------------------------------

      - login.js

                Text fields for username and password, buttons to login or to register
                with the given information. 

        ------------------------------------------------------------------------------


   -- Css

      - App.css 
                Holds keyframes for fade-in animation, element appearance definitions and 'styles'
                for other elements to have as an argument.   

      - index.html 
                Holds bootstrap 5 link to simple.css, enabling darkmode for the site.
                (https://simplecss.org/)

        ------------------------------------------------------------------------------


--- Backend ---  

    -- Models 

      - Post.js
                Defines the scheme of posts, meaning 
                what data and how is structured and saved to database.   

      - user.js 
                Defines user scheme, attributes and data of an registered user.
                contains also hashing function for password, plain password is not saved.

        ------------------------------------------------------------------------------

   -- Server 
        
      - index.js

                Holds internet port information as well as other needed hardware configurations
                for the application to work.  

                Holds connection string to database, session configuration, slug-creation for posts,
                needed middlawares for checks and parsing of used datatypes, error handling if anything 
                goes wrong. 

                Calls and holds functions and variables which define the grounds 
                for the application. Where App.js works as a frame for rest of the 
                [visible]components, objects and elements; 

                index.js is the frame or more like a trunk going down to the routes
                invisible for user, holding functions to interract with the databases involved.  


      - dbConnection.js  

                Defines the function to connect to the database, called from index.js. 

        ------------------------------------------------------------------------------


 -- Database 

     - MongoDB is used. Database has three collections: users, sessions and posts 

     - a single post -document in collection of posts contains the information: 
                        
                          _id :          (index given by platform)
                        title :          topic title shown to user. 
                        description:     text content of the post. 
                        slug:            lowercase url, created from title in backend index.js.  
                        date:            date and time of the post creation.

                        
    - a user collection contains an username and (hashed)password per document. 

    - a single session document holds: 
    
                        _id     :     generated session id
                        expires :    < point in time when session is no longer valid >
                        userId  :     given id generated for the user

    ------------------------------------------------------------------------------

--- to run it..: 

    

    Clone:
   
    1  -  Open your terminal and then type:

      >  git clone {the url to the GitHub repo}

      <  This clones the repo to your chosen location. 

        ------------------------
    
    Install:
    
    2.1 - ChangeDirectory (cd) into the 'client' folder and type:

      >  npm install

      <  This installs the required dependencies for client / frontend 
 
        
    2.2 - cd into the server folder and type again: 

      > npm install 

      < This installs the required dependencies for the server / backend


        Please notice, unless you set up your own connection to database,
        there is not much to see or to be shown, before mockdata is created for demo.
        .env file should hold two variables:
  
        DB_URL= < Database-connection-string >
        SESSION_SECRET= < random string of 64 characters > *
        
        * client / src / components / genesecret.js will create you one secret if in need. 
        
        ------------------------
    
    Run:

    3 - To run the React project.

      > npm start 
      
        in two separate terminals: 
        one in blog-site-thing/client 
        to run the frontend

        and one for server in blog-site-thing/server 
        to run the backend
        ------------------------------------------------------------------------------


--- ToDo's:

    - set session checks at restricted pages
    - set session timeout 
    - fix editpost.js animation flicker 
    - better errors all over
    - image compression
        -'where i put images?' -function 
    - media storage for PDF
    - mockdata for test usage without database connection

  

