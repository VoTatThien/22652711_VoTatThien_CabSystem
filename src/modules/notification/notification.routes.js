const express = require('express');
const router = express.Router();
const notificationController = require('./notification.controller');

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: API quản lý thông báo người dùng
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Lấy danh sách thông báo của user hiện tại
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số thông báo mỗi trang
 *       - in: query
 *         name: isRead
 *         schema:
 *           type: boolean
 *         description: Lọc theo trạng thái đã đọc
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       message:
 *                         type: string
 *                       isRead:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Lỗi server
 */
router.get('/', notificationController.getNotifications);

/**
 * @swagger
 * /notifications/read-all:
 *   put:
 *     summary: Đánh dấu tất cả thông báo là đã đọc
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
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
 *                   type: object
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Lỗi server
 */
router.put('/read-all', notificationController.markAllAsRead);

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Đánh dấu 1 thông báo là đã đọc
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *                   type: object
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Không tìm thấy thông báo
 *       500:
 *         description: Lỗi server
 */
router.put('/:id/read', notificationController.markAsRead);

module.exports = router;
