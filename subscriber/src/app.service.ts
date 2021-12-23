import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(body) {
    console.log(body);
  }
}
