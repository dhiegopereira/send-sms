import { container } from 'tsyringe';
import { SmsRepository } from '../persistence/SmsRepository';
import SmsService from '../../application/services/SmsService';
import { SmsController } from '../../presentation/controllers/SmsController';
import SmsSendUseCase from '../../domain/useCases/Sms/SmsSendUseCase';
import SmsListUseCase from '../../domain/useCases/Sms/SmsListUseCase';

//#region SMS
container.registerSingleton<SmsSendUseCase>('SmsSendUseCase', SmsSendUseCase);
container.registerSingleton<SmsListUseCase>('SmsListUseCase', SmsListUseCase);
container.registerSingleton<SmsRepository>('SmsRepository', SmsRepository);
container.registerSingleton<SmsService>('SmsService', SmsService);
container.registerSingleton<SmsController>('SmsController', SmsController);
//#endregion

export default container;
