import { ISmsRepository } from "../../repositories/ISmsRepository";
import { SmsResponseDto } from "../../../application/dto/SmsDto";

export default class ListSmsUseCase {
    constructor(private smsRepository: ISmsRepository) {}

    async execute(phoneNumber: string): Promise<SmsResponseDto[]> {
        return await this.smsRepository.ListSms(phoneNumber);
    }
}
