import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop()
  topic: string;

  @Prop([String])
  urls: string[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
