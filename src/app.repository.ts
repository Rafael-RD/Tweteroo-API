class UserRepository {
  users: User[];

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

class TweetRepository {
  tweets: Tweet[];

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
