import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { SmsPresenter } from '../../adapters/presentation/SmsPresenter';
import SmsListUseCase from '../../core/useCases/sms/SmsListUseCase';
import SmsSendUseCase from '../../core/useCases/sms/SmsSendUseCase';

@injectable()
export default class SmsController {
    constructor(
        @inject('SmsListUseCase') private readonly smsListUseCase: SmsListUseCase,
        @inject('SmsSendUseCase') private readonly smsSendUseCase: SmsSendUseCase
    ) { }

    async sendSms(req: Request, res: Response, next: NextFunction) {
        try {
            const { body, to } = req.body;
            const response = await this.smsSendUseCase.execute({ body, to });
            res.status(200).json(SmsPresenter.presentResponse(response));
        } catch (error) {
            next(error);
        }
    }

    async listSms(req: Request, res: Response, next: NextFunction) {
        try {
            const { phoneNumber } = req.params;
            const responses = await this.smsListUseCase.execute(phoneNumber);
            res.status(200).json(SmsPresenter.presentManyResponses(responses));
        } catch (error) {
            next(error);
        }
    }
}
