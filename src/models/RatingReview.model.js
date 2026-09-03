const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     RatingReview:
 *       type: object
 *       properties:
 *         rideId:
 *           type: string
 *         rating:
 *           type: number
 *         comment:
 *           type: string
 */
const ratingReviewSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 500 }
}, {
  timestamps: { createdAt: true, updatedAt: false } // Chỉ có createdAt
});

ratingReviewSchema.index({ driverId: 1, createdAt: -1 });

module.exports = mongoose.model('RatingReview', ratingReviewSchema);
