const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         type:
 *           type: string
 *           enum: [ride_update, payment, promotion, system]
 *         title:
 *           type: string
 *         message:
 *           type: string
 */
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['ride_update', 'payment', 'promotion', 'system'] },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  metadata: { type: mongoose.Schema.Types.Mixed } // Dữ liệu bổ sung
}, {
  timestamps: { createdAt: true, updatedAt: false } // Chỉ có createdAt
});

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
