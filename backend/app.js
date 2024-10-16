require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./src/routes/auth')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const scrapeRoutes = require('./src/routes/scrape')
const razorpayRoutes = require('./src/routes/razorpay')
// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors());
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// routes
app.use('/auth', authRoutes);
app.use('/scrape', scrapeRoutes);
app.use('/razorpay', razorpayRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database');
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
