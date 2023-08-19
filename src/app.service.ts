import { Injectable } from '@nestjs/common';
import { TweetRepository, UserRepository } from './app.repository';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tweetRepository: TweetRepository
  ) { }

  getHealth(): string {
    return 'Server is online!';
  }

  getAllTweets(): Tweet[] {
    return this.tweetRepository.getAllTweets();
  }
}
