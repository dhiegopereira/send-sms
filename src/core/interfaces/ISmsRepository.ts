import SmsEntity from '../entities/SmsEntity';
import { SmsPresenter } from '../../adapters/presentation/SmsPresenter';

export default interface ISmsRepository {   
    save(smsEntity: SmsEntity): Promise<ReturnType<typeof SmsPresenter.presentResponse>>;
    findByPhoneNumber(phoneNumber: string): Promise<ReturnType<typeof SmsPresenter.presentManyResponses>>;
}
