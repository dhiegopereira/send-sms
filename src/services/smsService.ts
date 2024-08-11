import twilio from 'twilio';
import { SmsOptions } from '../models/SmsOptions';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const send = async (options: SmsOptions): Promise<string> => {
    try {
        const message = await client.messages.create({
            body: options.body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: options.to,
        });
        return `Message sent with SID: ${message.sid}`;
    } catch (error) {
        console.error('Failed to send SMS:', error);
        throw error;
    }
}