import { Repository } from 'typeorm';
import { SmsEntity } from '../../domain/entities/SmsEntity';
import { SmsResponseDto } from "../../application/dto/SmsDto";
import { ISmsRepository } from "../../domain/repositories/ISmsRepository";
import Database from '../config/Database';

export class SmsRepository implements ISmsRepository {
    private repository: Repository<SmsEntity> | undefined;

    constructor() {
        Database.initialize().then(() => {
            this.repository = Database.getDataSource().getRepository(SmsEntity);
        }).catch(error => {
            console.error('Error initializing repository:', error);
            throw error;
        });
    }

    async SaveSms(smsEntity: SmsEntity): Promise<boolean> {
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

    async ListSms(phoneNumber: string): Promise<SmsResponseDto[]> {
        try {
            if (!this.repository) {
                throw new Error('Repository not initialized');
            }
            
            const smsList = await this.repository.find({ where: { to: phoneNumber } });
            return smsList.map((sms: SmsEntity) => ({
                from: sms.from,
                to: sms.to,
                body: sms.body,
                status: sms.status,
                createdAt: sms.createdAt,
            }));
        } catch (error) {
            console.error('Error listing SMS:', error);
            return [];
        }
    }
}
