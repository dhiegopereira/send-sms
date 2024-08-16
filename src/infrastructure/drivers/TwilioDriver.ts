import { injectable } from 'tsyringe';
import twilio, { Twilio } from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import ITwilioDriver from '../../core/interfaces/ITwilioDriver';

@injectable()
export default class TwilioDriver implements ITwilioDriver {
    private readonly clientTwilio: Twilio;

    constructor() {
        this.clientTwilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendMessage(to: string, body: string, from: string): Promise<MessageInstance> {
        return await this.clientTwilio.messages.create({
            body,
            from,
            to,
        });
    }
}
