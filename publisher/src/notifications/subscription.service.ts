import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import {
  Subscription,
  SubscriptionDocument,
} from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
    private httpService: HttpService,
  ) {}

  // subscribe to a topic
  async subscribeToTopic(topic: string, url: string) {
    // store the topic name
    const topic_ = topic.trim().replace(/ /g, '_');
    try {
      const subscription = await this.subscriptionModel.findOneAndUpdate(
        {
          topic: topic_,
        },
        {
          topic: topic_,
          $addToSet: { urls: url },
        },
        { upsert: true, new: true },
      );
      if (subscription) {
        return {
          url,
          topic,
        };
      }
      throw new Error('unable to store new subscription');
    } catch (error) {
      throw new BadRequestException(error.message());
    }
  }

  // publish topic
  async publishToTopic(topic: string, body: any) {
    // fetch topic fields
    const topic_ = topic.trim().replace(/ /g, '_');
    const subscription = await this.subscriptionModel.findOne({
      topic: topic_,
    });
    if (!subscription) {
      // throw an error here
      throw new NotFoundException('topic not found');
    }
    // publish to all subscribed url
    const urls = subscription.urls;
    try {
      // throw event to process
      await this.notificationQueue.add('notification:send', {
        urls,
        topic,
        body,
      });

      return {
        data: `message published successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Not all message was published successfully, please check the log to retry',
      );
    }
  }

  async sendRequestToServers(urls, topic, body) {
    await Promise.all(
      urls.map((url) => {
        lastValueFrom(
          this.httpService.post(url, {
            topic,
            data: body,
          }),
        );
      }),
    );
  }
}
