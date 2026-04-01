import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Episode, EpisodeCard } from "@/types/episode";
export { formatDate, formatDuration } from "@/lib/utils";

const EPISODES_DIR = path.join(process.cwd(), "content", "episodes");

function readEpisodeFile(filename: string): Episode | null {
  try {
    const filePath = path.join(EPISODES_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      ...data,
      transcript: content.trim() || data.transcript,
    } as Episode;
  } catch {
    return null;
  }
}

/** Return all episodes sorted newest first */
export async function getAllEpisodes(): Promise<Episode[]> {
  if (!fs.existsSync(EPISODES_DIR)) return [];

  const files = fs
    .readdirSync(EPISODES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .filter((f) => !f.startsWith("_"));

  const episodes = files
    .map(readEpisodeFile)
    .filter((ep): ep is Episode => ep !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return episodes;
}

/** Return lightweight card objects for archive/homepage */
export async function getAllEpisodeCards(): Promise<EpisodeCard[]> {
  const episodes = await getAllEpisodes();
  return episodes.map((ep) => ({
    id: ep.id,
    slug: ep.slug,
    title: ep.title,
    subtitle: ep.subtitle,
    publishedAt: ep.publishedAt,
    duration: ep.duration,
    guestNames: ep.guestNames,
    summaryShort: ep.summaryShort,
    topics: ep.topics,
    coverImage: ep.coverImage,
    platforms: ep.platforms,
    featured: ep.featured,
    startHere: ep.startHere,
    episodeNumber: ep.episodeNumber,
  }));
}

/** Return a single episode by slug */
export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes();
  return episodes.find((ep) => ep.slug === slug) ?? null;
}

/** Return related episodes by IDs, falling back to topic overlap */
export async function getRelatedEpisodes(
  episode: Episode,
  limit = 3
): Promise<EpisodeCard[]> {
  const all = await getAllEpisodeCards();

  // First: explicitly related
  const byId = all.filter(
    (ep) => ep.id !== episode.id && episode.relatedEpisodeIds?.includes(ep.id)
  );

  if (byId.length >= limit) return byId.slice(0, limit);

  // Fill with topic overlap
  const byTopic = all
    .filter(
      (ep) =>
        ep.id !== episode.id &&
        !episode.relatedEpisodeIds?.includes(ep.id) &&
        ep.topics.some((t) => episode.topics.includes(t))
    )
    .slice(0, limit - byId.length);

  return [...byId, ...byTopic].slice(0, limit);
}

/** Return all slugs for generateStaticParams */
export async function getAllSlugs(): Promise<string[]> {
  const episodes = await getAllEpisodes();
  return episodes.map((ep) => ep.slug);
}

/** Return featured episodes */
export async function getFeaturedEpisodes(limit = 6): Promise<EpisodeCard[]> {
  const all = await getAllEpisodeCards();
  const featured = all.filter((ep) => ep.featured || ep.startHere);
  if (featured.length >= limit) return featured.slice(0, limit);
  // Fill with latest
  const rest = all.filter((ep) => !ep.featured && !ep.startHere);
  return [...featured, ...rest].slice(0, limit);
}

