import SmsEntity from "../../core/entities/SmsEntity";

export default interface ISmsRepository {
    save(sms: any): Promise<SmsEntity>;
    findByPhoneNumber(phoneNumber: string): Promise<SmsEntity[]>;
}
