import { Repository } from 'typeorm';
import SmsEntity from '../../core/entities/SmsEntity';
import TypeORMConfig from '../frameworks/TypeORMConfig';
import { inject, injectable } from 'tsyringe';
import ISmsRepository from '../../core/interfaces/ISmsRepository';
import { SmsPresenter } from '../../adapters/presentation/SmsPresenter';

@injectable()
export default class SmsRepository implements ISmsRepository {
    private repository: Repository<SmsEntity>;

    constructor(
        @inject('TypeORMConfig') private readonly typeORMConfig: TypeORMConfig,
    ) {
        this.repository = typeORMConfig.getDataSource().getRepository(SmsEntity);
    }

    async save(smsEntity: SmsEntity): Promise<SmsEntity> {
        try {
            if (!this.repository) {
                throw new Error('Repository not initialized');
            }
            return await this.repository.save(smsEntity);
        } catch (error: any) {
            throw new Error(`Error saving entity: ${error.message}`);
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
            return [];
        }
    }
}
