import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TweetRepository, UserRepository } from './app.repository';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDTO } from './DTOs/user.dto';
import { CreateTweetDTO } from './DTOs/tweet.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tweetRepository: TweetRepository
  ) { }

  getHealth(): string {
    return 'Server is online!';
  }

  signUp(userDTO: CreateUserDTO) {
    const userExistsCheck = this.userRepository.getUserByUsername(userDTO.username);
    if (!userExistsCheck) {
      const newUser = new User(userDTO.username, userDTO.avatar);
      this.userRepository.createUser(newUser);
    }
  }

  postTweet(tweetDTO: CreateTweetDTO) {
    const user = this.userRepository.getUserByUsername(tweetDTO.username);
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.UNAUTHORIZED);
    }
    const tweet = new Tweet(user, tweetDTO.tweet);
    this.tweetRepository.postTweet(tweet);
  }

  getAllTweets(): Tweet[] {
    return this.tweetRepository.getAllTweets();
  }
}
