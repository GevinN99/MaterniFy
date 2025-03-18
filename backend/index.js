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
const postRoutes = require('./routes/community-routes/postRoutes');
const communityRoutes = require('./routes/community-routes/communityRoutes')
const replyRoutes = require('./routes/community-routes/replyRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes');
const availableSlotRoutes = require('./routes/availableSlotRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const quizRoutes = require('./routes/quizRoutes');
const locationRoutes = require('./routes/locationRoutes');
const partnerRoutes = require('./routes/partnerRoutes');

const app = express()

// Middleware
app.use(
	cors({
		origin: ["http://localhost:8081", "http://192.168.43.214:8081"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
)
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: true,
	})
)


// Connect to MongoDB
connectDB();

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/available-slots', availableSlotRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/exercises', require('./routes/exerciseRoutes'));
app.use("/api/users", userRoutes)
app.use("/api/health-plans", healthPlanRoutes)
app.use("/api/emergency-contacts", emergencyContactRoutes)
app.use("/api/community-posts", postRoutes)
app.use("/api/communities", communityRoutes)
app.use("/api/community-replies", replyRoutes)
app.use('/api/location', locationRoutes);
app.use('/api/partner', partnerRoutes);

const PORT = process.env.PORT || 8070;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
