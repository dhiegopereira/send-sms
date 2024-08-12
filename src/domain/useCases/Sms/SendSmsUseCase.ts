import twilio from 'twilio';
import { ISmsRepository } from "../../repositories/ISmsRepository";
import { SmsRequestDto, SmsResponseDto } from "../../../application/dto/SmsDto";
import { SmsEntity } from '../../entities/SmsEntity';

export default class SendSmsUseCase {
    private readonly clientTwilio;

    constructor(private smsRepository: ISmsRepository) {
        this.clientTwilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async execute(smsRequestDto: SmsRequestDto): Promise<SmsResponseDto> {
        const message = await this.clientTwilio.messages.create({
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