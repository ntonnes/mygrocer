const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const cors = require('cors');
const crypto = require('crypto');
const validator = require('validator');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '.env.local' });
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080', // Update this to the origin of your client
    credentials: true,
}));
app.use(cookieParser());
app.use(async (req, res, next) => {
    try {
        const sessionToken = req.cookies.sessionToken;
        console.log('Session token:', sessionToken); // Debug: print session token
        if (sessionToken) {
            const session = await pool.query('SELECT * FROM Sessions WHERE token = $1', [sessionToken]);
            console.log('Session:', session.rows); // Debug: print session
            if (session.rows.length > 0) {
                req.user = session.rows[0].user_id; // Attach the user ID to the request
                console.log('User ID:', req.user); // Debug: print user ID
            }
        }
        next();
    } catch (error) {
        console.error('Error in session middleware:', error);
        next(error);
    }
});


// PostgreSQL database credentials
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});


// Function to generate a unique token
function generateUniqueToken() {
    return crypto.randomBytes(64).toString('hex');
}


// Registration endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Email validation with validator
    if (!validator.isEmail(email)) {
        console.log('Invalid email address'); 
        return res.status(400).send('Invalid email address');
    }

    // Check if email already exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
        console.log('Email already registered');
        return res.status(409).send('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO Users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    console.log('User created')
    res.status(201).send('User created');
});

// Session endpoint
app.get('/api/session', async (req, res) => {
    const sessionToken = req.cookies.sessionToken;
    if (sessionToken) {
      const session = await pool.query('SELECT * FROM Sessions WHERE token = $1', [sessionToken]);
      if (session.rows.length > 0) {
        const user = await pool.query('SELECT * FROM Users WHERE id = $1', [session.rows[0].user_id]);
        res.json({ user: user.rows[0] });
      } else {
        res.json({ user: null });
      }
    } else {
      res.json({ user: null });
    }
  });

// Login endpoint
app.post('/login', async (req, res) => {
    // Check if email and password are provided
    const { email, password } = req.body;
    console.log('Email:', email); // Debug: print email
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('User:', user.rows); // Debug: print user
    if (user.rows.length === 0) {
        return res.status(404).send('User not found');
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    console.log('Password match:', passwordMatch); // Debug: print password match result
    if (!passwordMatch) {
        return res.status(401).send('Incorrect password');
    }

    // Send a success message
    const sessionToken = generateUniqueToken();
    console.log('Generated session token:', sessionToken); // Debug: print generated session token
    await pool.query('INSERT INTO Sessions (user_id, token) VALUES ($1, $2)', [user.rows[0].id, sessionToken]);
    res.cookie('sessionToken', sessionToken, { httpOnly: true, maxAge: 86400000 });
    res.status(200).json({ user: user.rows[0] });
});

// Logout endpoint
app.post('/api/logout', async (req, res) => {
    const sessionToken = req.cookies.sessionToken;
    if (sessionToken) {
        // Invalidate the session in the database
        await pool.query('DELETE FROM Sessions WHERE token = $1', [sessionToken]);
    }
    // Clear the session cookie
    res.clearCookie('sessionToken');
    res.status(200).send('Logged out');
});


// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));