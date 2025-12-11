 

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require("socket.io");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const publicRoutes = require('./routes/publicRoutes');
const universityRoutes = require('./routes/universityRoutes');  
// Import Routes
const auth = require('./routes/authRoutes');
const consultancies = require('./routes/consultancyRoutes');
const students = require('./routes/studentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const staffRoutes = require('./routes/staffRoutes');
const holidayRoutes = require('./routes/holidayRoutes');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// --- MIDDLEWARE ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 1. CORS - Allow Credentials
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

// 2. HELMET - Security
app.use(helmet());
app.use(morgan('dev'));

// 3. NUCLEAR CACHE FIX (Add this block!)
// This forces Chrome to never store the API response
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    next();
});

// --- ROUTES ---
app.use('/api/auth', auth);
app.use('/api/consultancies', consultancies);
app.use('/api/students', students);
app.use('/api/upload', uploadRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/public', publicRoutes); 
app.use('/api/universities', universityRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/events', require('./routes/eventRoutes'));


app.get('/', (req, res) => {
    res.json({ message: "Japan Visa SaaS API is running..." });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});
// 2. Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your Frontend URL
    methods: ["GET", "POST"]
  }
});

// 3. Socket Logic
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Join a specific room based on User ID (for private notifications)
  socket.on('join_room', (userId) => {
     socket.join(userId);
     console.log(`User ${userId} joined their private room`);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// 4. Make 'io' accessible in your Controllers
app.set('io', io);



 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));