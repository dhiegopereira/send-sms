import { Request, Response, NextFunction  } from 'express';
import SmsService from '../../application/services/SmsService';

export class SmsController {
    constructor(private readonly smsService: SmsService) { }

    async sendSms(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body, to } = req.body;
            const response = await this.smsService.sendSms({ body, to });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async listSms(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { phoneNumber } = req.params;
            const response = await this.smsService.listSms(phoneNumber);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}
