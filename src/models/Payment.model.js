const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         rideId:
 *           type: string
 *         amount:
 *           type: number
 *         method:
 *           type: string
 *           enum: [cash, e_payment]
 */
const paymentSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true, min: 0 },
  method: { type: String, required: true, enum: ['cash', 'e_payment'] },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'], default: 'PENDING' },
  transactionId: { type: String },
  paidAt: { type: Date },
  failureReason: { type: String }
}, {
  timestamps: true
});

paymentSchema.index({ rideId: 1 });
paymentSchema.index({ customerId: 1, createdAt: -1 });

module.exports = mongoose.model('Payment', paymentSchema);
