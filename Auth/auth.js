const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const UserModel = require('./signup'); 
const user = new UserModel();



router.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        const email=userData.email;
       
      if (!email || !userData.password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      
      const existingUser = await user.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }
  
      
      await user.create(userData);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during sign-up:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  });
  

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    
    const existingUser = await user.findByEmail(email);
    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    
    const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during sign-in:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
