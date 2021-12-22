import { IsDefined, IsUrl } from 'class-validator';

export class SubscribeDto {
  @IsUrl()
  @IsDefined()
  url: string;
}
