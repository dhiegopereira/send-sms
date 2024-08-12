import { getConnection } from 'typeorm';
import Database from '../src/infrastructure/config/Database';

beforeAll(async () => {
    await Database.getConnection();
});

afterAll(async () => {
    await Database.closeConnection();
});