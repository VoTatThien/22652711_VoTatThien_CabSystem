const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API quản trị hệ thống
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Tổng quan dashboard
 *     tags: [Admin]
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
 *                   properties:
 *                     totalRides:
 *                       type: integer
 *                     totalRevenue:
 *                       type: number
 *                     activeDrivers:
 *                       type: integer
 *                     totalCustomers:
 *                       type: integer
 *                     recentRides:
 *                       type: array
 *                       items:
 *                         type: object
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/dashboard', adminController.getDashboard);

/**
 * @swagger
 * /admin/customers:
 *   get:
 *     summary: Danh sách khách hàng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/customers', adminController.getCustomers);

/**
 * @swagger
 * /admin/drivers:
 *   get:
 *     summary: Danh sách tài xế
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/drivers', adminController.getDrivers);

/**
 * @swagger
 * /admin/rides:
 *   get:
 *     summary: Danh sách chuyến đi
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/rides', adminController.getRides);

/**
 * @swagger
 * /admin/rides/{id}/intervene:
 *   put:
 *     summary: Can thiệp chuyến đi (hủy, gán lại)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - reason
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [cancel, reassign]
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.put('/rides/:id/intervene', adminController.interveneRide);

/**
 * @swagger
 * /admin/payments:
 *   get:
 *     summary: Lịch sử giao dịch
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/payments', adminController.getPayments);

/**
 * @swagger
 * /admin/reports/revenue:
 *   get:
 *     summary: Báo cáo doanh thu
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/reports/revenue', adminController.getRevenueReport);

/**
 * @swagger
 * /admin/reports/operations:
 *   get:
 *     summary: Báo cáo hoạt động
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/reports/operations', adminController.getOperationsReport);

/**
 * @swagger
 * /admin/reports/drivers:
 *   get:
 *     summary: Báo cáo hiệu suất tài xế
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/reports/drivers', adminController.getDriverPerformanceReport);

/**
 * @swagger
 * /admin/audit-logs:
 *   get:
 *     summary: Lấy nhật ký hệ thống (Audit logs)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/audit-logs', adminController.getAuditLogs);

/**
 * @swagger
 * /admin/users/{id}/role:
 *   put:
 *     summary: Thay đổi vai trò người dùng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.put('/users/:id/role', adminController.changeUserRole);

module.exports = router;
