// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://test:test@devgoyal.fgogkld.mongodb.net/?retryWrites=true&w=majority&appName=DevGoyal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

const LoginSchema = new mongoose.Schema({
  username: String,
  password: String
  
});

const Login = mongoose.model('Login', LoginSchema);

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  comment: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/public/blade.jpg', (req, res) => {
  res.render('blade.jps');
});  
app.get('/signup', (req, res) => {
  res.render('signup');
});
app.get('/catagories', (req, res) => {
  res.render('catagories');
});
app.get('/index', (req, res) => {
  res.render('index');
});
app.post('/users', async (req, res) => {
  const { username, email, comment } = req.body;
  try {
    const newUser = new User({ username, email, comment });
    await newUser.save();
    res.redirect('/users');
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.redirect('/');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users', { users });
  } catch (err) {
    console.error('Error finding users:', err.message);
    res.redirect('/');
  }
});
// register users
app.post("/signup",async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const newLogin = new Login({ username, password});
    await newLogin.save();
    res.redirect('/signup');
    
  } catch (err) {
    console.error('Error saving logindata:', err.message);
    res.redirect('/');
  }

})

app.post("/login", async (req,res)=>{
  const { username, password } = req.body;
  try{
    const check = await Login.findOne({username});
    if(!check){
      res.send("user name cannot found");

    }
    const ispasswordMatch = ( password === check.password);
    if(!ispasswordMatch) {
      res.send("wrong password");
    }
    res.render("index");
   }catch{
    res.send("wrong details");
   }
  });


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
