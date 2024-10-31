/**
 * An Api class abstractly represents different ways to ask for submissions from
 * the Reddit API, such as new submissions to a subreddit or submissions from a
 * given author.
 */
export default abstract class Api {
  /**
   * Return a URI which can be used to query the appropriate Reddit API, given
   * a cursor for pagination.
   */
  public abstract uri(cursor: string | null): string;
}
