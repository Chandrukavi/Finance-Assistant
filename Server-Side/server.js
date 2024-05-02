const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://chandrukavi1604:FinaceDatabaseMDB@cluster0.omqjdar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  fullName: String,
  dateOfBirth: Date,
  address: String,
  phoneNumber: String,
  emailAddress: String,
  employmentDetails: String,
  bankingInformation: String,
  creditHistory: String,
  assetsAndLiabilities: String,
  maritalStatus: String,
  uniqueNumber: String,
  document: String,
  amount: Number,
  receiveDate: Date
});

const User = mongoose.model('User', userSchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); 
    // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

app.post('/users', upload.single('document'), (req, res) => {
  const { fullName, dateOfBirth, address, phoneNumber, emailAddress, employmentDetails, bankingInformation, creditHistory, assetsAndLiabilities, maritalStatus, uniqueNumber, amount, receiveDate } = req.body;
  const newUser = new User({
    fullName,
    dateOfBirth,
    address,
    phoneNumber,
    emailAddress,
    employmentDetails,
    bankingInformation,
    creditHistory,
    assetsAndLiabilities,
    maritalStatus,
    uniqueNumber,
    document: req.file ? req.file.path : '', 
    amount,
    receiveDate
  });
  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Modify the route to handle GET requests for fetching user details
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ error: err.message }));
});


//userdeatils view data button
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.listen(3005, () => {
  console.log("server is running");
});
