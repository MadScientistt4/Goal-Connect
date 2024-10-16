require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./src/routes/auth')
const cors = require('cors');
const cookieParser = require('cookie-parser')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5000', // Allow only your frontend domain
    credentials: true // This allows cookies to be sent
}));

app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/apis', authRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 