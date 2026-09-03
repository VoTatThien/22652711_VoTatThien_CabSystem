const express = require('express');
const router = express.Router();
const trackingController = require('./tracking.controller');

/**
 * @swagger
 * tags:
 *   name: Tracking
 *   description: API theo dõi vị trí tài xế
 */

/**
 * @swagger
 * /tracking/live:
 *   get:
 *     summary: Lấy danh sách các tài xế đang trực tuyến cùng vị trí
 *     description: Yêu cầu quyền admin hoặc operator. Trả về danh sách vị trí hiện tại của các tài xế đang online.
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       driverId:
 *                         type: string
 *                         example: "60b8d295f1d2c72b8c5e6f3d"
 *                       location:
 *                         type: object
 *                         properties:
 *                           lat:
 *                             type: number
 *                             example: 10.762622
 *                           lng:
 *                             type: number
 *                             example: 106.660172
 *                       status:
 *                         type: string
 *                         example: "available"
 *                       currentRideId:
 *                         type: string
 *                         example: null
 *                 message:
 *                   type: string
 *                   example: "Lấy danh sách tài xế online thành công"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Không có quyền truy cập
 *       500:
 *         description: Internal Server Error
 */
router.get('/live', trackingController.getLiveDrivers);

module.exports = router;
