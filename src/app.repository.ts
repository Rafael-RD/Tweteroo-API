import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Tweet } from "./entities/tweet.entity";

@Injectable()
export class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserByUsername(userName: string): User {
    return this.users.find(user => user.username === userName);
  }

  postUser(user: User): User {
    this.users.push(user);
    return user;
  }
}

@Injectable()
export class TweetRepository {
  private tweets: Tweet[];

  constructor() {
    this.tweets = [];
  }

  getAllTweets(): Tweet[] {
    return this.tweets;
  }

  getTweetsByUsername(user: User): Tweet[] {
    return this.tweets.filter(tweet => tweet.user.username === user.username);
  }

  postTweet(tweet: Tweet): Tweet {
    this.tweets.push(tweet);
    return tweet;
  }
}
