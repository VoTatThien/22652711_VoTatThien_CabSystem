const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         driverId:
 *           type: string
 *         plateNumber:
 *           type: string
 *         vehicleType:
 *           type: string
 *           enum: [sedan, suv, van]
 */
const vehicleSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverProfile', required: true },
  plateNumber: { type: String, required: true, unique: true },
  brand: { type: String },
  model: { type: String },
  color: { type: String },
  vehicleType: { type: String, required: true, enum: ['sedan', 'suv', 'van'] },
  seats: { type: Number },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

vehicleSchema.index({ driverId: 1 });
vehicleSchema.index({ vehicleType: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
