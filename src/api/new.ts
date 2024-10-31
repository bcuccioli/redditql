import Api from "./api";

/**
 * NewApi is an Api class for querying new submissions to a given subreddit.
 */
export class NewApi extends Api {
  subreddit: string;

  constructor(subreddit: string) {
    super();
    this.subreddit = subreddit;
  }

  uri(cursor: string | null) {
    const s = this.subreddit;
    const c = cursor || "";
    return (
      `https://oauth.reddit.com/r/${s}/new.json` +
      `?include_over_18=on&t=all&after=${c}&limit=100`
    );
  }
}
