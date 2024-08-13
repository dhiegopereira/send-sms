import { Request, Response, NextFunction  } from 'express';
import { inject, injectable } from 'tsyringe';
import ISmsService from '../../application/services/ISmsService';

@injectable()
export class SmsController {
    constructor(
        @inject('SmsService') private readonly smsService: ISmsService
    ) { }

    async sendSms(req: Request, res: Response, next: NextFunction) {
        try {
            const { body, to } = req.body;
            const response = await this.smsService.sendSms({ body, to });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async listSms(req: Request, res: Response, next: NextFunction) {
        try {
            const { phoneNumber } = req.params;
            const response = await this.smsService.listSms(phoneNumber);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}
