import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
    imports: [MailService],
    exports: [MailService]
})
export class MailModule {}
