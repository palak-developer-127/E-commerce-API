const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend')));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
