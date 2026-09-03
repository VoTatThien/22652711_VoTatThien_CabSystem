const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     DriverProfile:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID của User
 *         licenseNumber:
 *           type: string
 *         licenseClass:
 *           type: string
 *           enum: [B1, B2, C, D]
 *         status:
 *           type: string
 *           enum: [offline, available, busy]
 */
const driverProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  licenseNumber: { type: String, required: true, unique: true, minlength: 12, maxlength: 12 },
  licenseClass: { type: String, required: true, enum: ['B1', 'B2', 'C', 'D'] },
  status: { type: String, enum: ['offline', 'available', 'busy'], default: 'offline' },
  isApproved: { type: Boolean, default: false },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  totalTrips: { type: Number, default: 0 },
  currentLocation: {
    type: { type: String, enum: ['Point'] }, // Tọa độ GeoJSON
    coordinates: { type: [Number] } // [Kinh độ, Vĩ độ]
  },
  approvedAt: { type: Date },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

// Index 2dsphere cho việc tìm kiếm theo không gian địa lý
driverProfileSchema.index({ currentLocation: '2dsphere' });
driverProfileSchema.index({ status: 1, isApproved: 1 });

module.exports = mongoose.model('DriverProfile', driverProfileSchema);
