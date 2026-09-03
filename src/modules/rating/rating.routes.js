const express = require('express');
const router = express.Router();
const ratingController = require('./rating.controller');

/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: API đánh giá chuyến đi
 */

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Gửi đánh giá cho chuyến đi
 *     description: Yêu cầu quyền customer.
 *     tags: [Rating]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rideId
 *               - rating
 *             properties:
 *               rideId:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đánh giá thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Lỗi server
 */
router.post('/', ratingController.submitRating);

/**
 * @swagger
 * /ratings/driver/{driverId}:
 *   get:
 *     summary: Lấy danh sách đánh giá của một tài xế
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *       404:
 *         description: Không tìm thấy tài xế
 *       500:
 *         description: Lỗi server
 */
router.get('/driver/:driverId', ratingController.getDriverReviews);

/**
 * @swagger
 * /ratings/my-reviews:
 *   get:
 *     summary: Tài xế xem đánh giá của chính mình
 *     description: Yêu cầu quyền driver.
 *     tags: [Rating]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Lỗi server
 */
router.get('/my-reviews', ratingController.getMyReviews);

module.exports = router;
