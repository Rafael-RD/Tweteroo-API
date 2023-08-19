import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDTO } from './DTOs/user.dto';
import { CreateTweetDTO } from './DTOs/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  signUp(@Body() user: CreateUserDTO): string {
    this.appService.signUp(user);
    return 'OK';
  }

  @Post('/tweets')
  postTweet(@Body() tweetDTO: CreateTweetDTO): string {
    this.appService.postTweet(tweetDTO);
    return 'Created';
  }

  @Get('/tweets')
  getTweets(): Tweet[] {
    return this.appService.getAllTweets();
  }
}
