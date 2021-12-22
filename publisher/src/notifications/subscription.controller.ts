import { Body, Controller, Param, Post } from '@nestjs/common';
import { SubscribeDto } from './dto/subscribe.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscribe')
export class SubscriptionController {
  constructor(private subscribeService: SubscriptionService) {}

  @Post(':topic')
  async subscribeToTopic(
    @Param('topic') topic: string,
    @Body() subscribeDto: SubscribeDto,
  ) {
    return this.subscribeService.subscribeToTopic(topic, subscribeDto.url);
  }
}
