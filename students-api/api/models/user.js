const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
 first_name: {
   type: String,
   required: true,
   trim: true
 },
 last_name: {
   type: String,
   required: true,
   trim: true
 },
 email: {
   type: String,
   required: true,
   unique: true,
   lowercase: true,
   trim: true
 },
 password: {
   type: String,
   required: true
 }
}, {
 timestamps: true // Automatically adds createdAt and updatedAt timestamps
});


// Create the User model
const User = mongoose.model('User', userSchema);


module.exports = User;