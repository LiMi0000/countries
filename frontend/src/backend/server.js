import fetch from 'node-fetch';
import express from 'express';
import mongoose from 'mongoose';
const app = express();

app.get('/', (req, res) => {
  res.send('Node/Express with Mongodb');
});

app.use(express.static('../App.js'));

const postSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model('Post', postSchema);

export const getPosts = async () => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const results = await data.json();

  for (let i = 0; i < results.length; i++) {
    const newPost = new postModel({
      user_id: results[i]['userId'],
      id: results[i]['id'],
      title: results[i]['title'],
      description: results[i]['body'],
    });

    newPost.save();
  }
};

const PORT = 5050;
const uri =
  'mongodb+srv://country:country@country.gldlcn5.mongodb.net/?retryWrites=true&w=majority';

const mongodbConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`connected to mongodb `);
  } catch (error) {
    console.log(error);
  }
};

mongodbConnect();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
