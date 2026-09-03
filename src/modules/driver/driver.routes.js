const express = require('express');
const router = express.Router();
const driverController = require('./driver.controller');

/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: Driver management and operations
 */

/**
 * @swagger
 * /drivers/vehicle:
 *   post:
 *     summary: Register vehicle
 *     description: Register a new vehicle for driver
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plateNumber:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehicle registered successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update vehicle
 *     description: Update vehicle information
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.post('/vehicle', driverController.registerVehicle);
router.put('/vehicle', driverController.updateVehicle);

/**
 * @swagger
 * /drivers/status:
 *   put:
 *     summary: Toggle online/offline
 *     description: Change driver's availability status
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [available, offline]
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.put('/status', driverController.toggleStatus);

/**
 * @swagger
 * /drivers/pending:
 *   get:
 *     summary: List pending approvals
 *     description: List all drivers waiting for approval (operator/admin only)
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get('/pending', driverController.listPendingApprovals);

/**
 * @swagger
 * /drivers/{id}/approve:
 *   put:
 *     summary: Approve driver
 *     description: Approve a pending driver account
 *     tags: [Driver]
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
 *         description: Driver approved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/approve', driverController.approveDriver);

/**
 * @swagger
 * /drivers/{id}/reject:
 *   put:
 *     summary: Reject driver
 *     description: Reject a pending driver account
 *     tags: [Driver]
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
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Driver rejected successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/reject', driverController.rejectDriver);

/**
 * @swagger
 * /drivers/profile:
 *   get:
 *     summary: Driver dashboard
 *     description: Get driver profile and stats for dashboard
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get('/profile', driverController.getDashboard);

/**
 * @swagger
 * /drivers/{id}/block:
 *   put:
 *     summary: Block driver
 *     description: Block a driver account (admin only)
 *     tags: [Driver]
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
 *         description: Driver blocked successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/block', driverController.blockDriver);

module.exports = router;
