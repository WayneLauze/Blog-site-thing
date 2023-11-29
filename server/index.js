// server/index.js

const express = require("express");
const Post = require('../client/models/Post');
const dbConnect = require("./dbConnect");

const authRoutes = require('../client/routes/auth');


const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('../client/models/user'); // adjust the path according to your project structure

const bcrypt = require('bcrypt');


const PORT = process.env.PORT || 3001;

const app = express();

require('dotenv').config();



const store = new MongoDBStore({
  uri: 'mongodb+srv://vainolausi:nE00ox6GnukLbjpz@cluster0.deydchl.mongodb.net/demo?retryWrites=true&w=majority', // replace with your MongoDB connection string

  collection: 'sessions',
//   expires: 1000 * 60 * 60 * 2 // 2 hours , there is no checks for sessions yet
});


// session is created with the secret token from .env file
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}));



// slug creation
function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}


//execute database connection:
dbConnect();

// Middleware for parsing JSON bodies
app.use(express.json());


//requireLogin middleware for checking if user is logged in
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) {
    next(); // user is logged in, proceed to route
  } else {
    res.status(401).json({ error: 'Unauthorized user.' }); // user is not logged in, respond with 401
  }
}



// Middleware for authenticating users
app.use(async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      req.user = user;
    }
  }
  next();
});

    

//Login 
  //comparing the hashed version of the input password with the stored hash.
    //määritellään polku, joka ottaa vastaan käyttäjänimen ja salasanan
    app.post('/auth/login', async (req, res) => {
      const { username, password } = req.body;
     
      
      // Find the user by username
      const user = await User.findOne({ username });
    
      // If no user is found, return an error
      if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
    
      // If a user is found, check the password
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        req.session.userId = user._id;
        res.json(user);
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });

//Registration:
  // hashing the password with bcrypt before storing it in the database 
  app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if a user with the given username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }
  
    // If no existing user, proceed with hashing the password and creating a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password }); //password is being hashed in the model
  
    try {
      const savedUser = await user.save();
      req.session.userId = savedUser._id;
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({ error: 'Could not register, please try again' });
    }
  });


app.use(async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      req.user = user;
    }
  }
  next();
});


// Route for getting a single post by slug
app.get('/posts/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    return res.status(404).send({ message: 'Post not found' });
  }
  res.send(post);
});


// Route for creating a new post
app.post('/posts', requireLogin, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    slug: generateSlug(req.body.title),
    // Add other fields as needed
  });
  await post.save();
  res.status(201).send(post);
});

// Route for getting all posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find({});
  res.send(posts);
});

// Route for updating a post
app.put('/posts/:slug', requireLogin, async (req, res) => {
  const post = await Post.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
  if (!post) {
    return res.status(404).send({ message: 'Post not found' });
  }
  res.send(post);
});

// Route for deleting a post
app.delete('/posts/:slug', requireLogin, async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOneAndDelete({ slug });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.status(200).send(post);
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Error deleting post');
  }
});



// Route for registering a new user
app.use('/auth', authRoutes);


// Route for logging out
app.post('/auth/logout', (req, res) => {
  console.log(req.session);
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out, please try again' });
    }
    res.json({ message: 'Logged out' });
  });
});




app.get("/eco", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});