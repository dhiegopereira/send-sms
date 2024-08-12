import { DataSource } from 'typeorm';
import { SmsEntity } from '../../domain/entities/SmsEntity';

export default class Database {
    private static appDataSource: DataSource;

    public static async initialize(): Promise<void> {
        if (Database.appDataSource) {
            return;
        }

        Database.appDataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            entities: [SmsEntity],
            synchronize: true,
        });

        try {
            await Database.appDataSource.initialize();
            console.log('Database connection established');
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    public static getDataSource(): DataSource {
        if (!Database.appDataSource) {
            throw new Error('Database not initialized. Call initialize() first.');
        }
        return Database.appDataSource;
    }
}
