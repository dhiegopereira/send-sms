import { inject, injectable } from 'tsyringe';
import SmsListUseCase from '../../domain/useCases/Sms/SmsListUseCase';
import SmsSendUseCase from '../../domain/useCases/Sms/SmsSendUseCase';
import { SmsRequestDto, SmsResponseDto } from '../dto/SmsDto';

@injectable()
export default class SmsService {
    constructor(
        @inject('SmsSendUseCase') private readonly sendSmsUseCase: SmsSendUseCase,
        @inject('SmsListUseCase') private readonly listSmsUseCase: SmsListUseCase
    ) {}

    public async sendSms(smsRequest: SmsRequestDto): Promise<SmsResponseDto> {
       return this.sendSmsUseCase.execute(smsRequest);
    }

    public async listSms(phoneNumber: string): Promise<SmsResponseDto[]> {
        return this.listSmsUseCase.execute(phoneNumber);
    }
}