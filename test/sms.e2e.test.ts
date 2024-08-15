import request from 'supertest';
import { app, server } from '../src/index';

jest.mock('../src/infrastructure/drivers/TwilioDriver');
jest.mock('../src/infrastructure/data/SmsRepository');

describe('SMS UseCases E2E Tests', () => {
  afterAll(async () => {
    server.close();
  });

  it('should send an SMS successfully', async () => {
    const response = await request(app)
      .post('/sms')
      .send({
        to: '5511999999999',
        body: 'Test SMS',
      })
      .expect(200);
  });

  it('should list all SMS successfully', async () => {
    const response = await request(app)
      .get('/sms/5511999999999')
      .expect(200);

    expect(response.body.length).toBe(0);
  })
});
