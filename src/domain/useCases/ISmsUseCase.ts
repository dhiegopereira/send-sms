
import { SmsRequestDto, SmsResponseDto } from "../../application/dto/SmsDto";

export interface ISmsUseCase {
    listSms(phoneNumber: string): Promise<SmsResponseDto[]>;
    sendSms(smsRequestDto: SmsRequestDto): Promise<SmsResponseDto>;
}
