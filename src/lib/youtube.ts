/**
 * YouTube playlist RSS fetching for Everyday Data.
 * Uses the public YouTube RSS feed (no API key required).
 * Fetched at Next.js build time — zero client-side API calls.
 */

export interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  publishedDate: string;
  link: string;
}

/** Podcast-only playlist ID (YouTube Podcasts tab) */
export const EVERYDAY_DATA_PLAYLIST_ID = "PL-n0gsdniluxVKhlBj1exGLkbgS3ChXBT";

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

function extractTag(xml: string, tag: string): string {
  const cdataRegex = new RegExp(
    `<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`
  );
  const cdataMatch = cdataRegex.exec(xml);
  if (cdataMatch) return cdataMatch[1].trim();

  const plainRegex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
  const plainMatch = plainRegex.exec(xml);
  return plainMatch ? plainMatch[1].trim() : "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  const match = regex.exec(xml);
  return match ? match[1] : "";
}

function extractEntries(xml: string): string[] {
  const entries: string[] = [];
  const regex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    entries.push(match[1]);
  }
  return entries;
}

/**
 * Fetch videos from a YouTube playlist via public RSS feed.
 * Returns newest-first, up to `limit` items.
 */
export async function fetchYouTubePlaylist(
  playlistId: string,
  limit = 15
): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`,
      { next: { revalidate: 3600 } } // cache for 1 hour in Next.js
    );
    if (!res.ok) return [];
    const xml = await res.text();

    return extractEntries(xml)
      .map((entry) => {
        const videoId = extractTag(entry, "yt:videoId");
        return {
          videoId,
          title: decodeEntities(extractTag(entry, "title")),
          thumbnailUrl:
            extractAttr(entry, "media:thumbnail", "url") ||
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          description: decodeEntities(
            extractTag(entry, "media:description")
          ).slice(0, 300),
          publishedDate: extractTag(entry, "published"),
          link: `https://www.youtube.com/watch?v=${videoId}`,
        };
      })
      .slice(0, limit);
  } catch {
    return [];
  }
}
