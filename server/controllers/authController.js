import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  console.log('\n=== Registration Process Started ===');
  console.log('Timestamp:', new Date().toISOString());
  
  try {
    console.log('1. Request received');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const { name, email, password } = req.body;

    // Validate required fields
    console.log('2. Validating required fields');
    if (!name || !email || !password) {
      console.log('Validation failed - Missing fields:', { 
        name: !!name, 
        email: !!email, 
        password: !!password 
      });
      return res.status(400).json({
        message: 'Please provide all required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }
    console.log('Required fields validation passed');

    // Validate email format
    console.log('3. Validating email format');
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      console.log('Email validation failed:', email);
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    console.log('Email format validation passed');

    // Validate password length
    console.log('4. Validating password length');
    if (password.length < 6) {
      console.log('Password validation failed - too short');
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    console.log('Password length validation passed');

    // Check if user exists
    console.log('5. Checking if user exists');
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }
    console.log('No existing user found');

    // Create user
    console.log('6. Creating new user');
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password
    });

    if (!user) {
      console.log('User creation failed - no user object returned');
      throw new Error('Failed to create user');
    }

    console.log('7. User created successfully:', user._id);
    const token = generateToken(user._id);
    console.log('8. Token generated');
    
    console.log('9. Sending success response');
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
    console.log('=== Registration Process Completed ===\n');
  } catch (error) {
    console.error('\n=== Registration Error ===');
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      console.log('Mongoose validation error');
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        details: validationErrors
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      console.log('Duplicate key error');
      return res.status(400).json({
        message: 'Email already exists'
      });
    }

    // Handle other errors
    console.log('Unhandled error');
    res.status(500).json({
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    console.log('=== Error Response Sent ===\n');
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    console.log('Login request received');
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      console.log('Missing required fields:', { email: !!email, password: !!password });
      return res.status(400).json({
        message: 'Please provide email and password',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Check for user email
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for user:', user._id);
    const token = generateToken(user._id);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    console.log('Get current user request received');
    console.log('User from token:', req.user);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      message: 'Failed to get user data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 