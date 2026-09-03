const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Ride:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *         status:
 *           type: string
 *         vehicleType:
 *           type: string
 */
const rideSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleType: { type: String, required: true, enum: ['sedan', 'suv', 'van'] },
  pickupAddress: { type: String, required: true },
  pickupLocation: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  dropoffAddress: { type: String, required: true },
  dropoffLocation: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  status: { 
    type: String, 
    enum: ['requested', 'searching', 'accepted', 'driver_arrived', 'in_progress', 'completed', 'cancelled', 'no_driver'], 
    default: 'searching' 
  },
  cancelledBy: { type: String, enum: ['customer', 'driver', 'operator', null], default: null },
  cancelReason: { type: String },
  estimatedFare: { type: Number },
  actualFare: { type: Number },
  estimatedDistance: { type: Number }, // tính bằng mét hoặc km
  actualDistance: { type: Number },
  estimatedDuration: { type: Number }, // tính bằng phút hoặc giây
  retryCount: { type: Number, default: 0, max: 5 },
  requestedAt: { type: Date, default: Date.now },
  acceptedAt: { type: Date },
  arrivedAt: { type: Date },
  startedAt: { type: Date },
  completedAt: { type: Date },
  cancelledAt: { type: Date }
}, {
  timestamps: true
});

rideSchema.index({ customerId: 1, requestedAt: -1 });
rideSchema.index({ driverId: 1, requestedAt: -1 });
rideSchema.index({ status: 1, requestedAt: -1 });
rideSchema.index({ pickupLocation: '2dsphere' });
rideSchema.index({ dropoffLocation: '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);
