require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./src/routes/auth')
const Razorpay = require("razorpay");
const cors = require('cors');
const cookieParser = require('cookie-parser')

// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Store these in your .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order route
app.post("/create-order", async (req, res) => {
  const { amount } = req.body; // amount in paise (INR)

  try {
    const options = {
      amount: amount, // amount in the smallest currency unit (e.g., 1000 paise for ₹10)
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

// routes
app.use('/apis', authRoutes);

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
