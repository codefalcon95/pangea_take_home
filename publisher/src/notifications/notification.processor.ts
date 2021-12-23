import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SubscriptionService } from './subscription.service';

@Processor('notification')
export class NotificationProcessor {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Process('notification:send')
  async send(job: Job) {
    //
    console.log(job);
    await this.subscriptionService.sendRequestToServers(
      job.data.urls,
      job.data.topic,
      job.data.body,
    );
  }
}
