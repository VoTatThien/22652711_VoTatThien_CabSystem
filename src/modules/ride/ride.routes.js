const express = require('express');
const router = express.Router();
const rideController = require('./ride.controller');

/**
 * @swagger
 * tags:
 *   name: Ride
 *   description: Ride booking and management
 */

/**
 * @swagger
 * /rides/geocode:
 *   get:
 *     summary: Search address
 *     description: Geocode an address to coordinates
 *     tags: [Ride]
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address details retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/geocode', rideController.searchAddress);

/**
 * @swagger
 * /rides/estimate:
 *   post:
 *     summary: Estimate fare
 *     description: Estimate the fare for a trip
 *     tags: [Ride]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickupLocation
 *               - dropoffLocation
 *               - vehicleType
 *             properties:
 *               pickupLocation:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: [longitude, latitude]
 *               dropoffLocation:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: [longitude, latitude]
 *               vehicleType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fare estimated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/estimate', rideController.estimateFare);

/**
 * @swagger
 * /rides/book:
 *   post:
 *     summary: Book a ride
 *     description: Create a new ride booking
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickupAddress
 *               - pickupLocation
 *               - dropoffAddress
 *               - dropoffLocation
 *               - vehicleType
 *               - paymentMethod
 *             properties:
 *               pickupAddress:
 *                 type: string
 *               pickupLocation:
 *                 type: array
 *                 items:
 *                   type: number
 *               dropoffAddress:
 *                 type: string
 *               dropoffLocation:
 *                 type: array
 *                 items:
 *                   type: number
 *               vehicleType:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ride booked successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.post('/book', rideController.bookRide);

/**
 * @swagger
 * /rides/{id}/arrived:
 *   put:
 *     summary: Mark arrived at pickup
 *     description: Driver marks as arrived at pickup location
 *     tags: [Ride]
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
 *         description: Marked as arrived successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/arrived', rideController.markArrived);

/**
 * @swagger
 * /rides/{id}/start:
 *   put:
 *     summary: Start ride
 *     description: Driver starts the ride
 *     tags: [Ride]
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
 *         description: Ride started successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/start', rideController.startRide);

/**
 * @swagger
 * /rides/{id}/complete:
 *   put:
 *     summary: Complete ride
 *     description: Driver marks ride as completed
 *     tags: [Ride]
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
 *         description: Ride completed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/complete', rideController.completeRide);

/**
 * @swagger
 * /rides/{id}/cancel:
 *   put:
 *     summary: Cancel ride
 *     description: Cancel an ongoing or pending ride
 *     tags: [Ride]
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
 *         description: Ride cancelled successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/cancel', rideController.cancelRide);

/**
 * @swagger
 * /rides/history:
 *   get:
 *     summary: Ride history
 *     description: Get user's ride history
 *     tags: [Ride]
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
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/history', rideController.getHistory);

/**
 * @swagger
 * /rides/{id}:
 *   get:
 *     summary: Ride detail
 *     description: Get specific ride detail
 *     tags: [Ride]
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
 *         description: Ride detail retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', rideController.getRideDetail);

module.exports = router;
