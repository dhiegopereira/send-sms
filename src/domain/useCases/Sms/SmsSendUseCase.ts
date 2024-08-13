import twilio from 'twilio';
import { SmsRequestDto, SmsResponseDto } from "../../../application/dto/SmsDto";
import SmsEntity from '../../entities/SmsEntity';
import { inject, injectable } from 'tsyringe';
import { SmsRepository } from '../../../infrastructure/persistence/SmsRepository';

@injectable()
export default class SmsSendUseCase {
    private readonly clientTwilio;

    constructor(
        @inject('SmsRepository') private readonly smsRepository: SmsRepository
    ) {
        this.clientTwilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async execute(smsRequestDto: SmsRequestDto): Promise<SmsResponseDto> {
        await this.clientTwilio.messages.create({
            body: smsRequestDto.body,
            from: process.env.TWILIO_PHONE_NUMBER ?? 'DEFAULT_PHONE_NUMBER',
            to: smsRequestDto.to,
        });

        const smsEntity = new SmsEntity(process.env.TWILIO_PHONE_NUMBER ?? 'DEFAULT_PHONE_NUMBER',
            smsRequestDto.to,
            smsRequestDto.body,
            'Ok',
            new Date());

        await this.smsRepository.SaveSms(smsEntity);

        return smsEntity as SmsResponseDto;
    }
}