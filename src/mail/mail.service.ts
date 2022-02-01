import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Mailgun from 'mailgun-js';
import { Mail } from "./interface/mail.interface";

@Injectable()
export class MailService {
    private mg: Mailgun.Mailgun;

    constructor(private configService: ConfigService) {
       /*  this.mg = Mailgun({
            apiKey: '',
            domain: ''
        }); */
    };

    send(data: Mail): Promise<Mailgun.messages.SendResponse> {
        return new Promise((res, rej) => {
            this.mg.messages().send(data, function(error: any, body: any) {
                if (error) {
                    rej(error);
                }
                res(body);
            });
        });
    }


}