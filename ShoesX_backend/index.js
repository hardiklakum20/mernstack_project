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
// const AdminRouter = require('./router/AdminRoute');
const UserRouter = require('./router/UserRoute');

connectDB();

const app = express();
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://shoesx-mernstack.vercel.app',
            'http://localhost:3000',
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ]
};

// ✅ Apply only once
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
defaultAdmin();

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/api', AuthRouter);
app.use('/api', CategoryRouter);
app.use('/api', SizeRouter);
app.use('/api', ColorRouter);
app.use('/api', BrandRouter);
app.use('/public/images', express.static('public/images'));
app.use('/api', ProductRouter);
app.use('/api', VarientRouter);
app.use('/api', UserRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));