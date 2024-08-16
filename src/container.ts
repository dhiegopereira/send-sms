import { container } from 'tsyringe';
import SmsListUseCase from './core/useCases/sms/SmsListUseCase';
import SmsSendUseCase from './core/useCases/sms/SmsSendUseCase';
import SmsController from './adapters/controllers/SmsController';
import TwilioDriver from './infrastructure/drivers/TwilioDriver';
import TypeORM from './infrastructure/frameworks/TypeORM';
import SmsRepository from './infrastructure/repositories/SmsRepository';
import Swagger from './web/routes/Swagger';

//#region SMS
container.registerSingleton<SmsListUseCase>('SmsListUseCase', SmsListUseCase);
container.registerSingleton<SmsSendUseCase>('SmsSendUseCase', SmsSendUseCase);
container.registerSingleton<SmsRepository>('SmsRepository', SmsRepository);
container.registerSingleton<SmsController>('SmsController', SmsController);
//#endregion

//#region Twilio
container.registerSingleton<TwilioDriver>('TwilioDriver', TwilioDriver);
//#endregion

//#region TypeORM
container.registerSingleton<TypeORM>('TypeORM', TypeORM);
//#endregion

//#Swagger
container.registerSingleton<Swagger>('Swagger', Swagger);
//#endregion

export default container;
