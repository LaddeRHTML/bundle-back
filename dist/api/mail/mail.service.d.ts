import { ConfigService } from "@nestjs/config";
import * as Mailgun from 'mailgun-js';
import { Mail } from "./interface/mail.interface";
export declare class MailService {
    private configService;
    private mg;
    constructor(configService: ConfigService);
    send(data: Mail): Promise<Mailgun.messages.SendResponse>;
}
