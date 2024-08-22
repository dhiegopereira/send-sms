import { SmsResponseDTO } from "../dto/SmsDTO";

export class SmsPresenter {


    static presentResponse(smsResponse: SmsResponseDTO): SmsResponseDTO {
        if (!smsResponse) return {} as any;

        return {
            from: smsResponse.from,
            to: smsResponse.to,
            body: smsResponse.body,
            status: smsResponse.status,
            createdAt: smsResponse.createdAt
        };
    }

    static presentManyResponses(smsResponse: SmsResponseDTO[]): SmsResponseDTO[] {
        if (!smsResponse) return [];
        return smsResponse.map(sms => this.presentResponse(sms));
    }
}
