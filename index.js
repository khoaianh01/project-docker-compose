
const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const Blog = require('./db')
const ejs = require('ejs')
const ejsMate = require('ejs-mate')
const path = require('path')
require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const dbName = process.env.DB_NAME || 'my_db_name'
// const {
//   DB_USER,
//   DB_PASSWORD,
//   DB_HOST,
//   DB_PORT,
//   DB_NAME,
// } = process.env;
const mongoUrl = 'mongodb://db/test'
 mongoose.connect(mongoUrl, 
  { 
     useNewUrlParser: true,
    useUnifiedTopology: true 
  
  })
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connected");
  });
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));


app.get('/', (req, res) => {
    res.render('index');
});
app.post('/add',async (req,res)=>{
    console.log(req.body)
    const blog = new Blog(req.body);
    await blog.save();
    res.redirect('/');
})
app.get('/show',async (req,res)=>{
    const blog = await Blog.find({});
    console.log(blog)
    res.render('show',{ blog })
})

app.listen('3000', (req, res) => {
    console.log('listening on http://localhost')
})
//docker tag local-image:tagname new-repo:tagname
//docker push new-repo:tagname
//V8b)8H9ES,Gv/nr\
//V8b)8H9ES,Gv/nr\