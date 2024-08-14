import { inject, injectable } from "tsyringe";
import { SmsPresenter } from "../../../adapters/presentation/SmsPresenter";
import ISmsRepository from "../../interfaces/ISmsRepository";

@injectable()
export default class SmsListUseCase {
    constructor(
        @inject('SmsRepository') private readonly smsRepository: ISmsRepository
    ) {}

    async execute(phoneNumber: string): Promise<ReturnType<typeof SmsPresenter.presentManyResponses>> {
        const smsEntities = await this.smsRepository.findByPhoneNumber(phoneNumber);
        return SmsPresenter.presentManyResponses(smsEntities);
    }
}
