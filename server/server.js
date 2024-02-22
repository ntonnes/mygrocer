const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const cors = require('cors');
const validator = require('validator');
require('dotenv').config({ path: '.env.local' });
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Connect to the PostgreSQL database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});


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


// Login endpoint
app.post('/login', async (req, res) => {

    // Check if email and password are provided
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
        return res.status(404).send('User not found');
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
        return res.status(401).send('Incorrect password');
    }

    // Send a success message
    res.status(200).send('Logged in');
});


// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));