import SmsEntity from '../../domain/entities/SmsEntity';
import { SmsResponseDto } from "../../application/dto/SmsDto";

export default interface ISmsRepository {   
    SaveSms(smsEntity: SmsEntity): Promise<boolean>;
    ListSms(phoneNumber: string): Promise<SmsResponseDto[]>;
}
