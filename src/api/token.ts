import axios from "axios";
import config from "../config";
import { z } from "zod";

/**
 * Given a refresh token, which is a static permanent token associated to an
 * account, fetch an access token, which is an ephemeral token needed for
 * querying the Reddit API.
 */
export async function getAccessToken(refreshToken: string) {
  const clientId = config().client_id;
  const clientSecret = config().client_secret;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const responseSchema = z.object({
    data: z.object({ access_token: z.string() }),
  });

  return responseSchema.parse(response).data.access_token;
}
