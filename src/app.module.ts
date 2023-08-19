import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetRepository, UserRepository } from './app.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserRepository, TweetRepository],
})
export class AppModule { }
