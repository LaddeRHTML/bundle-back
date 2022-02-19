import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './api/mail/mail.module';
import { ProductsModule } from './api/products/products.module';
import { ApplicationsModule } from './api/applications/applications.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_CONN, {
    useNewUrlParser: true,
  }),
  UsersModule, AuthModule, /* MailModule, */ ProductsModule, ApplicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
