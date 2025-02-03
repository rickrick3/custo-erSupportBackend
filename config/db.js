const mongoose = require("mongoose");
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

mongoose.connect(MONGODB_URI, {
  dbName: 'customerSupport',
  //bufferCommands: false,
});

console.log("Connected to MongoDB");
