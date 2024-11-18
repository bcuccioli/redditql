import axios from "axios";
import Context from "../context";
import { z } from "zod";

/**
 * Given a refresh token, which is a static permanent token associated to an
 * account, fetch an access token, which is an ephemeral token needed for
 * querying the Reddit API.
 */
export async function getAccessToken(context: Context) {
  const auth = Buffer.from(
    `${context.client_id}:${context.client_secret}`
  ).toString("base64");

  const response = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: context.refresh_token,
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
