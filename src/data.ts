export interface Author {
  name: string;
}

export interface Subreddit {
  name: string;
}

export interface Submission {
  id: string;
  title: string;
  author: Author;
  subreddit: Subreddit;
}
