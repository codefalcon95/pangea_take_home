import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './config/db.config';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      ignoreEnvFile: false,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => {
        console.log(configService.get('db'));
        return configService.get('db');
      },
      inject: [ConfigService],
    }),
    NotificationsModule,
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
