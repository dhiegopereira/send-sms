import request from 'supertest';
import { app, server } from '../src/index';
import SmsRepository from '../src/infrastructure/data/SmsRepository';
import TwilioDriver from '../src/infrastructure/drivers/TwilioDriver';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

jest.mock('../src/infrastructure/drivers/TwilioDriver');
jest.mock('../src/infrastructure/data/SmsRepository');

describe('SMS UseCases E2E Tests', () => {

  afterAll(async () => {
    server.close();
  });

  it('should send an SMS successfully', async () => {
    const saveSpy = jest.spyOn(SmsRepository.prototype, 'save');
    saveSpy.mockResolvedValue({
      from: '5511888888888',
      to: '5511999999999',
      body: 'Test SMS',
      status: 'sent',
      createdAt: new Date()
    });
    const sendMessageSpy = jest.spyOn(TwilioDriver.prototype, 'sendMessage');
    sendMessageSpy.mockResolvedValue({
      to: '5511999999999',
      from: '5511888888888',
      body: 'Test SMS',
      status: 'sent',
      dateSent: new Date(),
    } as MessageInstance);

    const response = await request(app)
      .post('/sms')
      .send({
        to: '5511999999999',
        body: 'Test SMS',
      })
      .expect(200);
    expect(response.body).toEqual({
      from: '5511888888888',
      to: '5511999999999',
      body: 'Test SMS',
      status: 'sent',
      createdAt: expect.any(String),
    });
  });



  it('should list all SMS successfully', async () => {
    const findByPhoneNumberSpy = jest.spyOn(SmsRepository.prototype, 'findByPhoneNumber');
    findByPhoneNumberSpy.mockResolvedValue([
      {
        from: '5511888888888',
        to: '5511999999999',
        body: 'Test SMS',
        status: 'sent',
        createdAt: new Date(),
      }
    ]);
    const response = await request(app)
      .get('/sms/5511999999999')
      .expect(200);

    expect(response.body.length).toBe(1);
  })
});
