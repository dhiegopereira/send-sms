import { Router, Request, Response } from 'express';
import smsRoutes from './smsRoutes';

const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Send SMS API'));

router.use('/sms', smsRoutes);


export default router;
