import { inject, injectable } from "tsyringe";
import ISmsRepository from "../../interfaces/ISmsRepository";
import SmsEntity from "../../entities/SmsEntity";

@injectable()
export default class SmsListUseCase {
    constructor(
        @inject('SmsRepository') private readonly smsRepository: ISmsRepository
    ) { }

    async execute(phoneNumber: string): Promise<SmsEntity[]> {
        return await this.smsRepository.findByPhoneNumber(phoneNumber);
    }
}


