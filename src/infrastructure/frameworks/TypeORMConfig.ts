import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import SmsEntity from '../../core/entities/SmsEntity';

@injectable()
export default class TypeORMConfig {
    private static appDataSource: DataSource;

    constructor() {
        if (!TypeORMConfig.appDataSource) {
            this.initialize().catch(error => {
                throw error;
            });
        }
    }

    private async initialize(): Promise<void> {
        TypeORMConfig.appDataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            entities: [SmsEntity],
            synchronize: true,
        });

        try {
            await TypeORMConfig.appDataSource.initialize();
        } catch (error) {
            throw error;
        }
    }

    public getDataSource(): DataSource {
        if (!TypeORMConfig.appDataSource) {
            throw new Error('TypeORMConfig not initialized. Instantiate the class first.');
        }
        return TypeORMConfig.appDataSource;
    }
}

