const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');
const globalError = require('./middlewares/globalError');
const authRoutes = require('./routes/auth');
const authMiddle = require('./middlewares/auth');
const restircTo = require('./middlewares/restircTo');
const expressSan = require('express-mongo-sanitize');
const expressLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/connectDB');

app.set('trust proxy', 1);

const limiter = expressLimit({
    limit: 30,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests, try again in an hour'
});


app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

const allowedOrigins = [
    'http://localhost:4200',
    'https://mohamedsamir1711.github.io',
    process.env.CLIENT_URL   // رابط الـ frontend على Vercel
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(morgan('dev'));
app.use(expressSan());
app.use(limiter);
app.use(helmet());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the E-commerce API',
    });
});

app.use('/products', productRoutes);
app.use('/user', authMiddle, restircTo("admin"), userRoutes);
app.use('/auth', authRoutes);

app.use('/', (req, res, next) => {
    res.status(404).send('Page Not Found');
});

app.use(globalError);

module.exports = app;

