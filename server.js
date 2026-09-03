require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');

// Cấu hình Database & Swagger
const connectDB = require('./src/config/db');
const swaggerSpec = require('./src/config/swagger');

// Middlewares
const errorHandler = require('./src/middlewares/error.middleware');

const app = express();
const server = http.createServer(app);

// Khởi tạo Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware cơ bản
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Gắn socket.io vào app để dùng trong controller
app.set('io', io);

// Mount API v1 Routes
app.use('/api/v1/auth', require('./src/modules/auth/auth.routes'));
app.use('/api/v1/drivers', require('./src/modules/driver/driver.routes'));
app.use('/api/v1/rides', require('./src/modules/ride/ride.routes'));
app.use('/api/v1/payments', require('./src/modules/payment/payment.routes'));
app.use('/api/v1/tracking', require('./src/modules/tracking/tracking.routes'));
app.use('/api/v1/notifications', require('./src/modules/notification/notification.routes'));
app.use('/api/v1/ratings', require('./src/modules/rating/rating.routes'));
app.use('/api/v1/admin', require('./src/modules/admin/admin.routes'));

// Test route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CAB System API is running',
    version: '1.0.0',
    docs: '/api-docs'
  });
});

// Xử lý lỗi
app.use(errorHandler);

// Socket.io connection & module registration
const trackingSocket = require('./src/modules/tracking/tracking.socket');

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Register socket modules
  trackingSocket(io, socket);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

// Connect to DB and Start Server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('Failed to connect to database', err);
  process.exit(1);
});
