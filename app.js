//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent =
  'Are you ready to embark on a journey of self-discovery, reflection, and personal growth? Your Daily Journal is here to help you capture your thoughts, feelings, and experiences every day.' +
  '\r\n' +
  'Why Choose Your Daily Journal? \n' +
  '🌟 Daily Reflections: We believe in the power of daily reflection to improve your mental well-being, increase self-awareness, and boost creativity. Start each day with intention and end it with gratitude.';

const aboutContent =
  "At Your Daily Journal, our mission is to empower individuals to harness the incredible power of journaling for a more enriched and mindful life. We believe that daily reflection and self-expression can lead to greater self-awareness, improved mental well-being, and a deeper connection with one's inner self.";
const contactContent =
  "We love hearing from our journaling community! Whether you have questions, feedback, or just want to say hello, we're here to assist you. Please feel free to reach out through any of the following methods: Email or Social Media";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', function (req, res) {
  res.render('home', {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});

app.post('/compose', function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);

  res.redirect('/');
});

app.get('/posts/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render('post', {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
