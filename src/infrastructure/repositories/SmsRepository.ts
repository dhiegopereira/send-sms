import { Repository } from "typeorm";
import SmsEntity from "../../core/entities/SmsEntity";
import ISmsRepository from "../../core/interfaces/ISmsRepository";
import TypeORM from "../frameworks/TypeORM";
import { inject, injectable } from "tsyringe";

@injectable()
export default class SmsRepository implements ISmsRepository {
     private repository: Repository<SmsEntity>;

    constructor(
        @inject('TypeORM') private readonly typeORM: TypeORM,
    ) {
        this.repository = this.typeORM.getDataSource().getRepository(SmsEntity);
    }

    async save(sms: any): Promise<SmsEntity> {
        try {
            if (!this.repository) {
                throw new Error('Repository not initialized');
            }
            return await this.repository.save(sms);
        } catch (error: any) {
            throw new Error(`Error saving entity: ${error.message}`);
        }
    }

    async findByPhoneNumber(phoneNumber: string): Promise<SmsEntity[]> {
        try {
            if (!this.repository) {
                throw new Error('Repository not initialized');
            }

            return await this.repository.find({ where: { to: phoneNumber } });
        } catch (error: any) {
            throw new Error(`Error listing entities: ${error.message}`);
        }
    }
}