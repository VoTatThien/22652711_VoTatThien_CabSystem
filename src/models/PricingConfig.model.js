const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     PricingConfig:
 *       type: object
 *       properties:
 *         vehicleType:
 *           type: string
 *           enum: [sedan, suv, van]
 *         baseFare:
 *           type: number
 *         pricePerKm:
 *           type: number
 *         pricePerMin:
 *           type: number
 */
const pricingConfigSchema = new mongoose.Schema({
  vehicleType: { type: String, required: true, unique: true, enum: ['sedan', 'suv', 'van'] },
  baseFare: { type: Number, required: true, min: 0 },
  pricePerKm: { type: Number, required: true, min: 0 },
  pricePerMin: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, default: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('PricingConfig', pricingConfigSchema);
