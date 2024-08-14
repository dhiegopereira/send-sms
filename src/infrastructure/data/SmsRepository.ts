import { Repository } from 'typeorm';
import SmsEntity from '../../core/entities/SmsEntity';
import TypeORMConfig from '../frameworks/TypeORMConfig';
import { inject, injectable } from 'tsyringe';
import ISmsRepository from '../../core/interfaces/ISmsRepository';
import { SmsPresenter } from '../../adapters/presentation/SmsPresenter';

@injectable()
export default class SmsRepository implements ISmsRepository {
    private repository: Repository<SmsEntity> | undefined;

    constructor(
        @inject('TypeORMConfig') private readonly typeORMConfig: TypeORMConfig
    ) {
        this.repository = typeORMConfig.getDataSource().getRepository(SmsEntity);

    }

    async save(smsEntity: SmsEntity): Promise<boolean> {
        try {
            if (!this.repository) {
                throw new Error('Repository not initialized');
            }

            console.log('Saving SMS:', smsEntity);
            await this.repository.save(smsEntity);
            return true;
        } catch (error) {
            console.error('Error saving SMS:', error);
            return false;
        }
    }

    async findByPhoneNumber(phoneNumber: string): Promise<ReturnType<typeof SmsPresenter.presentManyResponses>> {
        try {
            if (!this.repository) {
                throw new Error('Repository not initialized');
            }

            const smsList = await this.repository.find({ where: { to: phoneNumber } });
            return SmsPresenter.presentManyResponses(smsList);
        } catch (error) {
            console.error('Error listing SMS:', error);
            return [];
        }
    }
}
