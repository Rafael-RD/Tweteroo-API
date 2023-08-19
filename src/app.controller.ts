import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './DTOs/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  signUp(@Body() user: CreateUserDto): string {
    this.appService.signUp(user);
    return 'OK';
  }

  @Get('/tweets')
  getTweets(): Tweet[] {
    return this.appService.getAllTweets();
  }
}
