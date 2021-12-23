import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './config/db.config';
import queueConfig from './config/queue.config';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, queueConfig],
      ignoreEnvFile: false,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => {
        // console.log(configService.get('db'));
        return configService.get('db');
      },
      inject: [ConfigService],
    }),
    NotificationsModule,
  ],
})
export class AppModule {}
