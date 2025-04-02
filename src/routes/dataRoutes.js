const express = require("express");
const dataController = require("../controllers/dataController");

const router = express.Router();

/**
 * @swagger
 * /api/data:
 *   post:
 *     summary: Create user data
 *     description: This API allows users to create data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               data:
 *                 type: object
 *                 additionalProperties: true
 *             required:
 *               - userId
 *               - data
 *     responses:
 *       201:
 *         description: Data created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/data", dataController.createData);

/**
 * @swagger
 * /api/data/{userId}:
 *   get:
 *     summary: Get all user data
 *     description: This API retrieves all data for a specific user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve data for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/data/:userId", dataController.getData);

// Other routes (update, delete) will also follow this pattern
module.exports = router;
