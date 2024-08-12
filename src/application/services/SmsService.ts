import { SmsRequestDto, SmsResponseDto } from '../dto/SmsDto';
import { ListSmsUseCase, SendSmsUseCase } from '../../domain/useCases/Sms';

class SmsService {
    constructor(
        private readonly sendSmsUseCase: SendSmsUseCase,
        private readonly listSmsUseCase: ListSmsUseCase
    ) {}

    public async sendSms(smsRequest: SmsRequestDto): Promise<SmsResponseDto> {
       return this.sendSmsUseCase.execute(smsRequest);
    }

    public async listSms(phoneNumber: string): Promise<SmsResponseDto[]> {
        return this.listSmsUseCase.execute(phoneNumber);
    }
}

export default SmsService;