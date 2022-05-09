import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './api/products/products.module';
import { ApplicationsModule } from './api/applications/applications.module';
import { FilesModule } from './api/files/files.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRoot(process.env.DB_CONN, {
            useNewUrlParser: true
        }),
        UsersModule,
        AuthModule,
        ProductsModule,
        ApplicationsModule,
        FilesModule
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {}
