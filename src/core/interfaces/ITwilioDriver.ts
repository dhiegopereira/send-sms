import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

export default interface ITwilioDriver {
    sendMessage(to: string, body: string, from: string): Promise<MessageInstance>;
}
