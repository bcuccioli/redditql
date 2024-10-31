import Api from "./api";

/**
 * AuthoredApi is an Api class for querying new submissions from a given user.
 */
export class AuthoredApi extends Api {
  user: string;

  constructor(user: string) {
    super();
    this.user = user;
  }

  uri(cursor: string | null) {
    const a = this.user;
    const c = cursor || "";
    return (
      `https://oauth.reddit.com/user/${a}/submitted.json` +
      `?sort=new&type=links&after=${c}&limit=100`
    );
  }
}
