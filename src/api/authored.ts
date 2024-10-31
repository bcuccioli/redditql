import Api from "./api";

/**
 * AuthoredApi is an Api class for querying new submissions from a given user.
 */
export class AuthoredApi extends Api {
  user: string;
  limit: number;

  constructor(user: string, limit: number = 100) {
    super();
    this.user = user;
    this.limit = limit;
  }

  uri(cursor: string | null) {
    const a = this.user;
    const c = cursor || "";
    const l = Math.min(this.limit, 100);
    return (
      `https://oauth.reddit.com/user/${a}/submitted.json` +
      `?sort=new&type=links&after=${c}&limit=${l}`
    );
  }
}
