import { SmsRequestDto, SmsResponseDto } from '../dto/SmsDto';

export default interface ISmsService {
    sendSms(smsRequest: SmsRequestDto): Promise<SmsResponseDto>;
    listSms(phoneNumber: string): Promise<SmsResponseDto[]>;
}