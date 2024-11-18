/**
 * A Context consists of environment data needed to query the Reddit API. This
 * includes:
 *   - client_id / client_secret: These correspond to a Reddit app.
 *   - refresh_token: This is a permanent token corresponding to an individual
 *     user, obtained when that user authorizes the app via oauth.
 */
export default interface Context {
  client_id: string;
  client_secret: string;
  refresh_token: string;
}
