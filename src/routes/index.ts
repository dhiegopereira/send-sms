import { Router, Request, Response } from 'express';
import sms from './sms';

const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Send SMS API'));
router.use('/sms', sms);

module.exports = router;