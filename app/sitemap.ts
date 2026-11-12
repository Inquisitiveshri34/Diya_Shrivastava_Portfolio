import type { MetadataRoute } from "next";
import { SHOW_WRITING } from "@/content/site";
import { loadPosts, loadProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

/** Every public page. Drafts are excluded by the loaders; Writing is listed only while SHOW_WRITING is on. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/work",
    "/about",
    "/resume",
    ...loadProjects().map((project) => `/work/${project.slug}`),
    ...(SHOW_WRITING ? ["/writing", ...loadPosts().map((post) => `/writing/${post.slug}`)] : []),
  ];
  // The home URL has no trailing slash, the same form Next uses for its canonical link.
  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : new URL(path, SITE_URL).toString(),
  }));
}
