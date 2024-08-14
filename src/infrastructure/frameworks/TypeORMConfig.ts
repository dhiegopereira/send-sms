import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import SmsEntity from '../../core/entities/SmsEntity';

@injectable()
export default class TypeORMConfig {
    private static appDataSource: DataSource;

    constructor() {
        if (!TypeORMConfig.appDataSource) {
            this.initialize().catch(error => {
                console.error('Error initializing TypeORMConfig:', error);
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
            console.log('TypeORMConfig connection established');
        } catch (error) {
            console.error('Error initializing TypeORMConfig:', error);
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

