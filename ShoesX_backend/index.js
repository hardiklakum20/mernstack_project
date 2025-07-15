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
app.use(express.json());
app.use(cors())
defaultAdmin();

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