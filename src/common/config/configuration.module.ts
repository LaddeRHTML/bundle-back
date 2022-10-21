import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConfigurationService } from './configuration.service';

@Module({
    exports: [ConfigurationService],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    providers: [ConfigurationService]
})
export class ConfigurationModule {}
