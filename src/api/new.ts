import Api from "./api";

/**
 * NewApi is an Api class for querying new submissions to a given subreddit.
 */
export class NewApi extends Api {
  subreddit: string;
  limit: number;

  constructor(subreddit: string, limit: number = 100) {
    super();
    this.subreddit = subreddit;
    this.limit = limit;
  }

  uri(cursor: string | null) {
    const s = this.subreddit;
    const c = cursor || "";
    const l = Math.min(this.limit, 100);
    return (
      `https://oauth.reddit.com/r/${s}/new.json` +
      `?include_over_18=on&t=all&after=${c}&limit=${l}`
    );
  }
}
