const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db/Database');
const AuthRouter = require('./router/AuthRoute');
const CategoryRouter = require('./router/CategoryRouter');
const SizeRouter = require('./router/SizeRouter');
const ColorRouter = require('./router/ColorRouter');
const BrandRouter = require('./router/BrandRouter');
const ProductRouter = require('./router/ProductRoute');
const VarientRouter = require('./router/VarientRouter');
const { defaultAdmin } = require('./controller/AuthController');
const UserRouter = require('./router/UserRoute');
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

// API Routes - be specific about route patterns
try {
    app.use('/api/auth', AuthRouter);
    app.use('/api/categories', CategoryRouter);
    app.use('/api/sizes', SizeRouter);
    app.use('/api/colors', ColorRouter);
    app.use('/api/brands', BrandRouter);
    app.use('/api/products', ProductRouter);
    app.use('/api/variants', VarientRouter);
    app.use('/api/users', UserRouter);
} catch (error) {
    console.error('Route setup error:', error);
}

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