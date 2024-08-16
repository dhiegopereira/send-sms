import { NextFunction, Request, Response, Router } from 'express';
import SmsController from '../../adapters/controllers/SmsController';
import container from '../../container';

const router = Router();
const smsController = container.resolve<SmsController>('SmsController');

/**
 * @swagger
 * /sms/{phoneNumber}:
 *   get:
 *     summary: Retrieve a list of SMS messages for a given phone number
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         required: true
 *         description: The phone number to retrieve SMS messages for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of SMS messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   from:
 *                     type: string
 *                     example: "+1234567890"
 *                   to:
 *                     type: string
 *                     example: "+0987654321"
 *                   body:
 *                     type: string
 *                     example: "Hello, this is a test message."
 *                   status:
 *                     type: string
 *                     example: "sent"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-12T12:34:56Z"
 *       404:
 *         description: No SMS messages found for the given phone number
 *       500:
 *         description: Internal server error
 */
router.get('/:phoneNumber', (req: Request, res: Response, next: NextFunction) => smsController.listSms(req, res, next));


/**
 * @swagger
 * /sms:
 *   post:
 *     summary: Send an SMS message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: The recipient's phone number
 *                 example: "+0987654321"
 *               body:
 *                 type: string
 *                 description: The message body
 *                 example: "Hello, this is a test message."
 *     responses:
 *       200:
 *         description: SMS message successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 from:
 *                   type: string
 *                   example: "+1234567890"
 *                 to:
 *                   type: string
 *                   example: "+0987654321"
 *                 body:
 *                   type: string
 *                   example: "Hello, this is a test message."
 *                 status:
 *                   type: string
 *                   example: "sent"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-12T12:34:56Z"
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */

router.post('/', (req: Request, res: Response, next: NextFunction) => smsController.sendSms(req, res, next));

export default router;
