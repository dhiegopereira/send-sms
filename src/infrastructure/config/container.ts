import { container } from 'tsyringe';
import SmsListUseCase from '../../core/useCases/sms/SmsListUseCase';
import SmsSendUseCase from '../../core/useCases/sms/SmsSendUseCase';
import SmsController from '../../adapters/controllers/SmsController';
import TwilioDriver from '../drivers/TwilioDriver';
import TypeORMConfig from '../frameworks/TypeORMConfig';
import SmsRepository from '../repositories/SmsRepository';

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
container.registerSingleton<TypeORMConfig>('TypeORMConfig', TypeORMConfig);

//#endregion

export default container;
