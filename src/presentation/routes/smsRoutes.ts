
import { NextFunction, Request, Response, Router } from 'express';
import { SmsController } from '../controllers/SmsController';
import SmsService from '../../application/services/SmsService';
import { ListSmsUseCase, SendSmsUseCase } from '../../domain/useCases/Sms';
import { SmsRepository } from '../../infrastructure/persistence/SmsRepository';

const smsRepository = new SmsRepository();

const sendSmsUseCase = new SendSmsUseCase(smsRepository);
const listSmsUseCase = new ListSmsUseCase(smsRepository);

const smsService = new SmsService(sendSmsUseCase, listSmsUseCase);

const smsController = new SmsController(smsService);

const router = Router();

router.get('/:phoneNumber', (req: Request, res: Response, next: NextFunction) => smsController.listSms(req, res, next));
router.post('/', (req: Request, res: Response, next: NextFunction) => smsController.sendSms(req, res, next));

export default router;
