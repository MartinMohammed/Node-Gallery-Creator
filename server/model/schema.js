// ----------- NEED SCHEMA TO DESCRIPE THE STRUCUTRE/SCHEMA OF OUR MONGO COLLECTION ---------
const mongoose = require("mongoose");

// create a new instanc eof mongoose scheam object
const uploadSchema = new mongoose.Schema({
  // specify names of the fields and add validators
  // original file name
  filename: {
    type: String,
    // that each document must have a unique value for a given path
    unique: true,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  //   Base64 is an encoding algorithm that converts any characters, binary data, and even images or sound files into a readable string
  imageBase64: {
    type: String,
    required: true,
  },
});

// Mongo will create a collectin called uploads in our database with the given SCHEMA
module.exports = UploadModel = mongoose.model("uploads", uploadSchema);
