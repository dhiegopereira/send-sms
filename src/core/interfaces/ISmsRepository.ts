import SmsEntity from '../entities/SmsEntity';
import { SmsPresenter } from '../../adapters/presentation/SmsPresenter';

export default interface ISmsRepository {   
    save(smsEntity: SmsEntity): Promise<boolean>;
    findByPhoneNumber(phoneNumber: string): Promise<ReturnType<typeof SmsPresenter.presentManyResponses>>;
}
