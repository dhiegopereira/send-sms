import { container } from 'tsyringe';
import SmsRepository from '../persistence/SmsRepository';
import SmsService from '../../application/services/SmsService';
import SmsController from '../../presentation/controllers/SmsController';
import SmsUseCase from '../../domain/useCases/SmsUseCase';

//#region SMS
container.registerSingleton<SmsUseCase>('SmsSendUseCase', SmsUseCase);
container.registerSingleton<SmsRepository>('SmsRepository', SmsRepository);
container.registerSingleton<SmsService>('SmsService', SmsService);
container.registerSingleton<SmsController>('SmsController', SmsController);
//#endregion

export default container;
