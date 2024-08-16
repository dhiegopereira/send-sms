type SmsRequest = {
    to: string;
    body: string;
};

type SmsResponse = {
    from: string;
    to: string;
    body: string;
    status: string;
    createdAt: Date;
};

export class SmsPresenter {

    static presentRequest(smsRequest: SmsRequest): { to: string, body: string } {
        const { to, body } = smsRequest;
        return { to, body };
    }

    static presentResponse(smsResponse: SmsResponse): SmsResponse {
        if (!smsResponse) return {} as any;

        return {
            from: smsResponse.from,
            to: smsResponse.to,
            body: smsResponse.body,
            status: smsResponse.status,
            createdAt: smsResponse.createdAt
        };
    }

    static presentManyResponses(smsResponse: SmsResponse[]): SmsResponse[] {
        if (!smsResponse) return [];
        return smsResponse.map(sms => this.presentResponse(sms));
    }
}
