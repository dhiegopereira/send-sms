import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import SmsListUseCase from '../../core/useCases/sms/SmsListUseCase';
import SmsSendUseCase from '../../core/useCases/sms/SmsSendUseCase';
import { SmsPresenter } from '../presenters/SmsPresenter';

type Constructor<T> = new () => T;


@injectable()
export default class SmsController {
    constructor(
        @inject('SmsListUseCase') private readonly smsListUseCase: SmsListUseCase,
        @inject('SmsSendUseCase') private readonly smsSendUseCase: SmsSendUseCase
    ) {

    }

    /**
     * @api {post} /sms Enviar SMS
     * @apiName PostSms
     * @apiGroup SMS
     * @apiVersion 1.0.0
     * 
     * @apiBody {String} to Número do telefone de destino EX: 5511999999999.
     * @apiBody {String} body Corpo da mensagem.
     * 
     * @apiParamExample {json} Exemplo de Requisição:
     *   {
     *      "to": "+1234567890",
     *      "body": "Hello, this is a test message."
     *   }
     * 
     * @apiSuccessExample {json} Exemplo de Resposta:  
     *    HTTP/1.1 200 OK
     *   {
     *      "from": "+1234567890",
     *      "to": "+0987654321",
     *      "body": "Hello, this is a test message.",
     *      "status": "sent",
     *      "createdAt": "2024-08-12T12:34:56Z"
     *   }
    */
    async sendSms(req: Request, res: Response, next: NextFunction) {
        try {
            const { to, body } = req.body;
            const response = await this.smsSendUseCase.execute(to, body);
            return res.status(200).json(SmsPresenter.presentResponse(response));
        } catch (error) {
            next(error);
        }
    }

    /**
     * @api {get} /sms/:phoneNumber Listar SMS
     * @apiName GetSms
     * @apiGroup SMS
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} phoneNumber Número do telefone.
     * 
     * @apiSuccessExample {json} Exemplo de Resposta:  
     *    HTTP/1.1 200 OK
     *   [
     *      {
     *          "from": "+1234567890",
     *          "to": "+0987654321",
     *          "body": "Hello, this is a test message.",
     *          "status": "sent",
     *          "createdAt": "2024-08-12T12:34:56Z"
     *      }
     *   ]
    */
    async listSms(req: Request, res: Response, next: NextFunction) {
        try {
            const { phoneNumber } = req.params;
            const responses = await this.smsListUseCase.execute(phoneNumber);
            return res.status(200).json(SmsPresenter.presentManyResponses(responses));
        } catch (error) {
            next(error);
        }
    }

}
