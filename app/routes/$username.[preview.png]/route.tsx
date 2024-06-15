import { Resvg } from "@resvg/resvg-js";
import { LoaderFunctionArgs } from "@remix-run/node";
import { createPreviewImage } from "../$username/createImage";
import { topGistForUser } from "~/services/gistService";

const resvgConfig = {
  fitTo: {
    mode: ("width" as const),
    value: 600,
  },
  font: {
    fontFiles: [
      "./public/fonts/LuckiestGuy-Regular.ttf",
      "./public/fonts/georgia.ttf",
    ], // Load custom fonts.
    loadSystemFonts: true, // It will be faster to disable loading system fonts.
    defaultFontFamily: "Georgia",
  },
};

export async function loader({ params }: LoaderFunctionArgs) {
  const topGists = await topGistForUser(params.username || "");
  const first = topGists[0];
  const filename = first?.files[0].name || "";
  const stars = first?.stargazerCount || 0;
  const svg = createPreviewImage({
    username: params.username || "",
    filename,
    description: first?.description || "",
    stars,
    url: `https://jester.codes/${params.username}`,
  });
  const image = new Resvg(svg, resvgConfig).render();
  return new Response(image.asPng(), {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600", // cache for 3 hours
      "Content-Type": "image/png",
    },
  });
}
