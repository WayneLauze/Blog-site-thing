const mongoose = require('mongoose');


// define the Post model schema, meaning the form and types, 
// how the data will be stored in the database
// more info about mongoose schemas: https://mongoosejs.com/docs/guide.html
// more fields like links to other documents can be added later
const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  slug: String,  
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;