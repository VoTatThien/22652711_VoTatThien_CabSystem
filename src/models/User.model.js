const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: Tên đầy đủ của người dùng
 *         email:
 *           type: string
 *           description: Địa chỉ email (duy nhất)
 *         phone:
 *           type: string
 *           description: Số điện thoại (10 chữ số, duy nhất)
 *         role:
 *           type: string
 *           enum: [customer, driver, operator, admin]
 *         isActive:
 *           type: boolean
 *         lastLoginAt:
 *           type: string
 *           format: date-time
 */
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Vui lòng nhập email hợp lệ'] 
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\d{10}$/, 'Số điện thoại phải bao gồm 10 chữ số'] 
  },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'driver', 'operator', 'admin'],
    default: 'customer' 
  },
  isActive: { type: Boolean, default: true },
  refreshToken: { type: String },
  lastLoginAt: { type: Date }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Các index phục vụ tìm kiếm nhanh
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1, isActive: 1 });

module.exports = mongoose.model('User', userSchema);
