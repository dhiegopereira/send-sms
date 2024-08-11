import { Router } from 'express';
import { smsController } from '../controllers/smsController';

const router = Router();

router.post('/', smsController);

export default router;
