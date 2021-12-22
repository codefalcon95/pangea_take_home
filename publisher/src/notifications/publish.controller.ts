import { Body, Controller, Param, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('publish')
export class PublishController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post(':topic')
  async publishToTopic(@Param('topic') topic: string, @Body() body: any) {
    //
    return this.subscriptionService.publishToTopic(topic, body);
  }
}
