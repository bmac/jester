import { LoaderFunctionArgs, json } from "@remix-run/node";
import { topGistForUser } from "~/services/gistService";
import { createPreviewImage } from "./previewService";

export async function loader({ params }: LoaderFunctionArgs) {
  const username = params.username || "";
  const topGists = await topGistForUser(username).catch(() => []);
  if (topGists.length === 0) {
    return json({}, 404);
  }
  const imageBuffer = createPreviewImage(username, topGists[0]);

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600", // cache for 3 hours
      "Content-Type": "image/png",
    },
  });
}
