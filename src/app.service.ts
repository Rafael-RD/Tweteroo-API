import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TweetRepository, UserRepository } from './app.repository';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './DTOs/user.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tweetRepository: TweetRepository
  ) { }

  getHealth(): string {
    return 'Server is online!';
  }

  signUp(user: CreateUserDto) {
    const userExistsCheck = this.userRepository.getUserByUsername(user.username);
    if (!userExistsCheck) {
      this.userRepository.createUser(user);
    }
  }

  getAllTweets(): Tweet[] {
    return this.tweetRepository.getAllTweets();
  }
}
