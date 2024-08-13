
import twilio from 'twilio';
import { inject, injectable } from "tsyringe";
import { SmsRequestDto, SmsResponseDto } from "../../application/dto/SmsDto";
import SmsEntity from "../entities/SmsEntity";
import ISmsRepository from "../../infrastructure/persistence/ISmsRepository";

@injectable()
export default class SmsListUseCase {
    private readonly clientTwilio;

    constructor(
        @inject('SmsRepository') private readonly smsRepository: ISmsRepository
    ) {
        this.clientTwilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async listSms(phoneNumber: string): Promise<SmsResponseDto[]> {
        return await this.smsRepository.ListSms(phoneNumber);
    }

    async sendSms(smsRequestDto: SmsRequestDto): Promise<SmsResponseDto> {
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
