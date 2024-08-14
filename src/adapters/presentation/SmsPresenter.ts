export class SmsPresenter {

    static presentRequest(request: any): { to: string, body: string } {
        return {
            to: request.to,
            body: request.body
        };
    }

    static presentResponse(response: any): { from: string, to: string, body: string, status: string, createdAt: Date } {
        return {
            from: response.from,
            to: response.to,
            body: response.body,
            status: response.status,
            createdAt: new Date(response.createdAt)
        };
    }

    static presentManyResponses(responses: any[]): { from: string, to: string, body: string, status: string, createdAt: Date }[] {
        return responses.map(response => this.presentResponse(response));
    }
}
