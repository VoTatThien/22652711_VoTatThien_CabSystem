const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment and pricing operations
 */

/**
 * @swagger
 * /payments/{rideId}/calculate:
 *   post:
 *     summary: Calculate actual fare
 *     description: Calculate the actual final fare for a completed ride
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fare calculated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.post('/:rideId/calculate', paymentController.calculateActualFare);

/**
 * @swagger
 * /payments/pricing:
 *   get:
 *     summary: Get pricing config
 *     description: Retrieve system pricing configuration
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pricing config retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get('/pricing', paymentController.getPricingConfig);

/**
 * @swagger
 * /payments/pricing/{vehicleType}:
 *   put:
 *     summary: Update pricing
 *     description: Update pricing configuration for a vehicle type
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleType
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
 *               - baseFare
 *               - pricePerKm
 *               - pricePerMin
 *             properties:
 *               baseFare:
 *                 type: number
 *               pricePerKm:
 *                 type: number
 *               pricePerMin:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pricing updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.put('/pricing/:vehicleType', paymentController.updatePricing);

/**
 * @swagger
 * /payments/{rideId}/cash-confirm:
 *   post:
 *     summary: Confirm cash payment
 *     description: Driver confirms receipt of cash payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cash payment confirmed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.post('/:rideId/cash-confirm', paymentController.confirmCashPayment);

/**
 * @swagger
 * /payments/{rideId}/e-payment:
 *   post:
 *     summary: Process e-payment
 *     description: Customer initiates e-payment (MoMo, ZaloPay, etc.)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: E-payment processed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.post('/:rideId/e-payment', paymentController.processEPayment);

/**
 * @swagger
 * /payments/{rideId}/invoice:
 *   get:
 *     summary: Get invoice
 *     description: Retrieve digital invoice for a trip
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.get('/:rideId/invoice', paymentController.getInvoice);

module.exports = router;
