import Fuse from "fuse.js";
import type { EpisodeCard } from "@/types/episode";

export interface SearchableEpisode {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  summaryShort: string;
  guestNames: string[];
  topics: string[];
}

export function buildSearchIndex(episodes: EpisodeCard[]): SearchableEpisode[] {
  return episodes.map((ep) => ({
    id: ep.id,
    slug: ep.slug,
    title: ep.title,
    subtitle: ep.subtitle ?? "",
    summaryShort: ep.summaryShort,
    guestNames: ep.guestNames,
    topics: ep.topics,
  }));
}

export function createFuseInstance(
  index: SearchableEpisode[]
): Fuse<SearchableEpisode> {
  return new Fuse(index, {
    keys: [
      { name: "title", weight: 3 },
      { name: "guestNames", weight: 2 },
      { name: "topics", weight: 2 },
      { name: "subtitle", weight: 1.5 },
      { name: "summaryShort", weight: 1 },
    ],
    threshold: 0.35,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
}

export function fuseSearch(
  fuse: Fuse<SearchableEpisode>,
  query: string
): string[] {
  if (!query.trim()) return [];
  return fuse.search(query).map((r) => r.item.slug);
}
