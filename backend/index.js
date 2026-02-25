const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Admin Panel API is running');
});

// Test Database Connection Route
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT current_database()');
        res.json({
            success: true,
            message: 'Successfully connected to PostgreSQL!',
            database: result.rows[0].current_database
        });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: err.message
        });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
