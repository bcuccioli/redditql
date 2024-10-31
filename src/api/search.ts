import Api from "./api";

/**
 * SearchApi is an Api class for querying submissions to a given subreddit based
 * on search terms.
 *
 * The search query is provided in the format "(A OR B) AND (C OR D)".
 */
export class SearchApi extends Api {
  subreddit: string;
  query: string;
  limit: number;

  constructor(subreddit: string, query: string, limit: number = 100) {
    super();

    this.subreddit = subreddit;
    this.query = query.replace(/ /gu, "+");
    this.limit = limit;
  }

  uri(cursor: string | null) {
    const s = this.subreddit;
    const c = cursor || "";
    const q = this.query;
    const l = Math.min(this.limit, 100);
    return (
      `https://oauth.reddit.com/r/${s}/search.json` +
      `?q=${q}&restrict_sr=on&include_over_18=on&sort=new&t=all` +
      `&after=${c}&limit=${l}`
    );
  }
}
