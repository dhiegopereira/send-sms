import { inject, injectable } from 'tsyringe';
import { SmsRequestDto, SmsResponseDto } from '../dto/SmsDto';
import ISmsService from './ISmsService';
import { ISmsUseCase } from '../../domain/useCases/ISmsUseCase';

@injectable()
export default class SmsService implements ISmsService{
    constructor(
        @inject('SmsSendUseCase') private readonly smsUseCase: ISmsUseCase,
    ) {}

    public async sendSms(smsRequest: SmsRequestDto): Promise<SmsResponseDto> {
       return this.smsUseCase.sendSms(smsRequest);
    }

    public async listSms(phoneNumber: string): Promise<SmsResponseDto[]> {
        return this.smsUseCase.listSms(phoneNumber);
    }
}