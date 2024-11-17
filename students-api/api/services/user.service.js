const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mysecretkey';

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            throw new Error('Email is already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email
            },
            JWT_SECRET,
            { expiresIn: '1h' });

        res.status(201).json({
            user: {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email
            },
            token: token
        });
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body
   
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }
       // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }
       // Generate a JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
       
      res.status(201).json({
        user: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        },
        token: token
      });
    } catch(error) {
      res.status(500).json({error: error.message })
    }   
}
   

module.exports = {
 registerUser,
 loginUser
}
