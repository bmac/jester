import { LoaderFunctionArgs } from "@remix-run/node";
import { createPreviewImage } from "../$username/createImage";
import { topGistForUser } from "~/services/gistService";

export async function loader({ params }: LoaderFunctionArgs) {
  const topGists = await topGistForUser(params.username || "");
  const first = topGists[0];
  const filename = first?.files[0].name || "";
  const stars = first?.stargazerCount || 0;
  const image = createPreviewImage({
    username: params.username || "",
    filename,
    description: first?.description || "",
    stars,
    url: `https://jester.codes/${params.username}`,
  });
  return new Response(image, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600", // cache for 3 hours
      "Content-Type": "image/svg+xml",
    },
  });
}
