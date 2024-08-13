import { SmsResponseDto } from "../../../application/dto/SmsDto";
import { inject, injectable } from "tsyringe";
import { SmsRepository } from "../../../infrastructure/persistence/SmsRepository";

@injectable()
export default class SmsListUseCase {
    constructor(
        @inject('SmsRepository') private readonly smsRepository: SmsRepository
    ) { }

    async execute(phoneNumber: string): Promise<SmsResponseDto[]> {
        return await this.smsRepository.ListSms(phoneNumber);
    }
}
