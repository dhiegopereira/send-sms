import { inject, injectable } from "tsyringe";
import ISmsRepository from "../../interfaces/ISmsRepository";
import TwilioDriver from "../../../infrastructure/drivers/TwilioDriver";
import SmsEntity from "../../entities/SmsEntity";
import { SmsPresenter, SmsRequest, SmsResponse } from "../../../adapters/presentation/SmsPresenter";

@injectable()
export default class SmsSendUseCase {
    constructor(
        @inject('SmsRepository') private readonly smsRepository: ISmsRepository,
        @inject('TwilioDriver') private readonly twilioDriver: TwilioDriver
    ) {}

    async execute(smsResquest: SmsRequest): Promise<SmsResponse> {
        const presentedRequest = SmsPresenter.presentRequest(smsResquest);
        const message = await this.twilioDriver.sendMessage(
            presentedRequest.to,
            presentedRequest.body,
            process.env.TWILIO_PHONE_NUMBER ?? 'DEFAULT_PHONE_NUMBER'
        );

        const smsEntity = new SmsEntity(
            process.env.TWILIO_PHONE_NUMBER ?? 'DEFAULT_PHONE_NUMBER',
            presentedRequest.to,
            presentedRequest.body,
            message.status,
            message.dateSent 
        );

        const result = await this.smsRepository.save(smsEntity);

        return SmsPresenter.presentResponse(result);
    }
}
