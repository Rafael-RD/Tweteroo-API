import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDTO } from './DTOs/user.dto';
import { CreateTweetDTO } from './DTOs/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  @HttpCode(200)
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
  getTweets(@Query('page') page: string) {
    const tweets = this.appService.getTweets(page);
    return tweets;
  }

  @Get('/tweets/:username')
  getTweetsByUsername(@Param('username') username: string) {
    const tweets = this.appService.getTweetsByUsername(username);
    return tweets;
  }
}
