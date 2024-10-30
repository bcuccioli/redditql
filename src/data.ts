export interface Author {
  id: string;
  name: string;
  submissions: Submission[];
}

export interface Subreddit {
  id: string;
  name: string;
  submissions: Submission[];
}

export interface Submission {
  id: string;
  title: string;
  author: Author;
  subreddit: Subreddit;
}

const authors: Author[] = [
  { id: "1", name: "author1", submissions: [] },
  { id: "2", name: "author2", submissions: [] },
];

const subreddits: Subreddit[] = [
  { id: "1", name: "subreddit1", submissions: [] },
  { id: "2", name: "subreddit2", submissions: [] },
];

const submissions: Submission[] = [
  {
    id: "1",
    title: "Submission 1",
    author: authors[0],
    subreddit: subreddits[0],
  },
  {
    id: "2",
    title: "Submission 2",
    author: authors[1],
    subreddit: subreddits[1],
  },
];

authors[0].submissions.push(submissions[0]);
authors[1].submissions.push(submissions[1]);
subreddits[0].submissions.push(submissions[0]);
subreddits[1].submissions.push(submissions[1]);

export { authors, subreddits, submissions };
