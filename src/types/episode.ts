export type ResourceType =
  | "article"
  | "tool"
  | "book"
  | "report"
  | "company"
  | "framework"
  | "video"
  | "other";

export interface Resource {
  label: string;
  url: string;
  type: ResourceType;
}

export interface Chapter {
  timestamp: string; // "00:04:30"
  title: string;
  note?: string;
  link?: string;
}

export interface Platform {
  spotify?: string;
  apple?: string;
  youtube?: string;
  hostPage?: string;
  rss?: string;
}

export interface GuestProfile {
  name: string;
  role?: string;
  company?: string;
  bioShort?: string;
  avatar?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface HostProfile {
  name: string;
  role?: string;
  bioShort: string;
  avatar?: string;
  linkedin?: string;
  twitter?: string;
}

export interface EpisodeSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface TranscriptSegment {
  speaker: string;
  timestamp?: string;
  text: string;
}

export interface Episode {
  // Identity
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  publishedAt: string; // ISO date string "2024-11-15"
  duration: string; // "45:32"
  episodeNumber?: number;
  season?: number;

  // People
  guestNames: string[];
  guestProfiles?: GuestProfile[];

  // Content
  summaryShort: string; // 2-3 sentences, platform-style
  summaryLong: string; // 150-400 words, web show notes
  takeaways: string[]; // 3-5 bullets
  topics: string[];

  // Media
  coverImage?: string;
  audioEmbed?: string; // embed URL (Spotify/Transistor embed)
  videoEmbed?: string; // YouTube embed URL

  // Platform links
  platforms: Platform;

  // Structure
  chapters: Chapter[];
  resources: Resource[];

  // Transcript — raw string in MDX body or structured
  transcript?: string;
  transcriptSegments?: TranscriptSegment[];

  // Relations
  relatedEpisodeIds: number[];
  featured?: boolean;
  startHere?: boolean;

  // SEO
  seo?: EpisodeSeo;
}

// Lightweight version for archive/cards — no heavy content fields
export type EpisodeCard = Pick<
  Episode,
  | "id"
  | "slug"
  | "title"
  | "subtitle"
  | "publishedAt"
  | "duration"
  | "guestNames"
  | "summaryShort"
  | "topics"
  | "coverImage"
  | "platforms"
  | "featured"
  | "startHere"
  | "episodeNumber"
>;

export const TOPICS = [
  "Data Foundations",
  "AI in Practice",
  "Analytics Culture",
  "Operational AI",
  "Governance & Trust",
  "Engineering & Resilience",
  "Career & Leadership",
  "Enterprise Transformation",
] as const;

export type Topic = (typeof TOPICS)[number];
