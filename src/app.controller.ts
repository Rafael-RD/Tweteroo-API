import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Tweet } from './entities/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get('/tweets')
  getTweets(): Tweet[] {
    return this.appService.getAllTweets();
  }
}
