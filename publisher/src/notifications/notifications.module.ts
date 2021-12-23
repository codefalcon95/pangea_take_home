import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionSchema,
} from './entities/subscription.entity';
import { NotificationProcessor } from './notification.processor';
import { PublishController } from './publish.controller';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      },
    ]),
    HttpModule,
    BullModule.registerQueueAsync({
      name: 'notification',
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        console.log(config.get('notification.queue'));
        return config.get('notification.queue');
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SubscriptionService, NotificationProcessor],
  controllers: [PublishController, SubscriptionController],
})
export class NotificationsModule {}
