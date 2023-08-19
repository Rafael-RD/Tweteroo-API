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
    return "I'm okay!";
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

  getTweets(page: string = '1') {
    const pageAsNumber = parseInt(page);
    if (isNaN(pageAsNumber) || pageAsNumber < 1) throw new HttpException('Page must be a number!', HttpStatus.BAD_REQUEST);

    return this.tweetRepository.getAllTweets().slice(15 * (pageAsNumber - 1), 15 * pageAsNumber).map(t => {
      return {
        username: t.user.username,
        avatar: t.user.avatar,
        tweet: t.tweet
      }
    });
  }
}
