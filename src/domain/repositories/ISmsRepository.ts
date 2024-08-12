import { SmsRequestDto, SmsResponseDto } from "../../application/dto/SmsDto";
import { SmsEntity } from "../entities/SmsEntity";

export interface ISmsRepository {
    SaveSms: (sms: SmsEntity) => Promise<boolean>;
    ListSms: (phoneNumber: string) => Promise<SmsResponseDto[]>;
}