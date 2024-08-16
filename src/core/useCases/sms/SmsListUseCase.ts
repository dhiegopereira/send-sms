import { inject, injectable } from "tsyringe";
import SmsEntity from "../../entities/SmsEntity";
import ISmsRepository from "../../interfaces/ISmsRepository";

@injectable()
export default class SmsListUseCase {
    constructor(
        @inject('SmsRepository') private readonly smsRepository: ISmsRepository
    ) { }

    async execute(phoneNumber: string): Promise<SmsEntity[]> {
        return await this.smsRepository.findByPhoneNumber(phoneNumber);
    }
}


