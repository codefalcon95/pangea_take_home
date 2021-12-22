import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './config/db.config';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      ignoreEnvFile: false,
    }),
    ,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => configService.get('db.url'),
      inject: [ConfigService],
    }),
    NotificationsModule,
  ],
})
export class AppModule {}
