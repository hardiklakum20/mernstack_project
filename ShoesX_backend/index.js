const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db/Database');
const { defaultAdmin } = require('./controller/AuthController');
const serverless = require('serverless-http');
const path = require('path');

// Initialize app first
const app = express();

// Set up middleware
app.use(express.json());
app.use(cors({
    origin: 'https://shoesx-mernstack.vercel.app',
    credentials: true
}));
app.options('*', cors());

// Database initialization middleware
let dbInitialized = false;
app.use(async (req, res, next) => {
    if (!dbInitialized) {
        try {
            await connectDB();
            await defaultAdmin();
            dbInitialized = true;
            console.log('Database initialized successfully');
            next();
        } catch (error) {
            console.error('Database init failed:', error);
            return res.status(500).json({ error: 'Database connection failed' });
        }
    } else {
        next();
    }
});

// Health check route
app.get('/ping', (req, res) => {
    res.json({ status: 'PONG', timestamp: new Date().toISOString() });
});

// Static files middleware
app.use('/public/images', express.static(path.join(__dirname, 'public', 'images')));

// Load routers one by one with error handling
const routers = [
    { path: '/api/auth', file: './router/AuthRoute', name: 'AuthRouter' },
    { path: '/api/categories', file: './router/CategoryRouter', name: 'CategoryRouter' },
    { path: '/api/sizes', file: './router/SizeRouter', name: 'SizeRouter' },
    { path: '/api/colors', file: './router/ColorRouter', name: 'ColorRouter' },
    { path: '/api/brands', file: './router/BrandRouter', name: 'BrandRouter' },
    { path: '/api/products', file: './router/ProductRoute', name: 'ProductRouter' },
    { path: '/api/variants', file: './router/VarientRouter', name: 'VarientRouter' },
    { path: '/api/users', file: './router/UserRoute', name: 'UserRouter' }
];

routers.forEach(({ path, file, name }) => {
    try {
        console.log(`Loading ${name} from ${file}...`);
        const router = require(file);
        app.use(path, router);
        console.log(`✓ ${name} loaded successfully`);
    } catch (error) {
        console.error(`✗ Error loading ${name}:`, error.message);
        console.error(`Stack: ${error.stack}`);
    }
});

// Catch-all route for unmatched requests
app.get('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
});

module.exports = app;
module.exports.handler = serverless(app);