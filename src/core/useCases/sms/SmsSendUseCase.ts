import { inject, injectable } from "tsyringe";
import ITwilioDriver from "../../interfaces/ITwilioDriver";
import ISmsRepository from "../../interfaces/ISmsRepository";
import SmsEntity from "../../entities/SmsEntity";

@injectable()
export default class SmsSendUseCase {
    constructor(
        @inject('SmsRepository') private readonly smsRepository: ISmsRepository,
        @inject('TwilioDriver') private readonly twilioDriver: ITwilioDriver
    ) { }

    async execute(to: string, body: string): Promise<SmsEntity> {
        const message = await this.twilioDriver.sendMessage(
            to,
            body,
            process.env.TWILIO_PHONE_NUMBER ?? 'DEFAULT_PHONE_NUMBER'
        );

        const smsEntity = new SmsEntity(
            process.env.TWILIO_PHONE_NUMBER ?? 'DEFAULT_PHONE_NUMBER',
            to,
            body,
            message.status,
            message.dateSent
        );

        return await this.smsRepository.save(smsEntity);
    }
}
