const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const healthPlanRoutes = require('./routes/healthPlanRoutes');
const emergencyContactRoutes = require('./routes/emergencyContactRoutes');
const communityPostRoutes = require('./routes/communityPostRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:8081'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/health-plans', healthPlanRoutes);
app.use('/api/emergency-contacts', emergencyContactRoutes);
app.use('/api/community-posts', communityPostRoutes);

const PORT = process.env.PORT || 8070;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
