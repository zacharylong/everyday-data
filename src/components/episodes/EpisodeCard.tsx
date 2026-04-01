import Link from "next/link";
import Badge from "@/components/ui/Badge";
import EpisodeMeta from "@/components/ui/EpisodeMeta";
import type { EpisodeCard as EpisodeCardType } from "@/types/episode";

interface EpisodeCardProps {
  episode: EpisodeCardType;
  featured?: boolean;
}

export default function EpisodeCard({ episode, featured = false }: EpisodeCardProps) {
  return (
    <article
      className={`card group flex flex-col h-full ${
        featured ? "border-violet/40 bg-surface-2" : ""
      }`}
    >
      {/* Cover art area */}
      <div className="relative bg-midnight-3 aspect-video flex items-center justify-center overflow-hidden">
        {episode.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={episode.coverImage}
            alt={`Cover art for episode: ${episode.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Fallback cover */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet/20 to-midnight-3 p-6">
            <svg width="48" height="48" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="10" width="2.5" height="5" rx="0.5" fill="white" opacity="0.3" />
              <rect x="4.5" y="6" width="2.5" height="9" rx="0.5" fill="white" opacity="0.5" />
              <rect x="8" y="3" width="2.5" height="12" rx="0.5" fill="white" opacity="0.7" />
              <rect x="11.5" y="7" width="2.5" height="8" rx="0.5" fill="white" opacity="0.4" />
              <circle cx="2.25" cy="8.5" r="1" fill="#22d3ee" />
              <circle cx="5.75" cy="4.5" r="1" fill="#22d3ee" />
              <circle cx="9.25" cy="1.5" r="1" fill="#22d3ee" />
              <circle cx="12.75" cy="5.5" r="1" fill="#22d3ee" />
            </svg>
          </div>
        )}
        {episode.startHere && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-mono font-semibold bg-cyan text-midnight rounded">
              START HERE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <EpisodeMeta
          publishedAt={episode.publishedAt}
          duration={episode.duration}
          episodeNumber={episode.episodeNumber}
        />

        <div className="flex-1">
          <h3 className="font-heading font-semibold text-text-primary text-base leading-snug group-hover:text-white transition-colors line-clamp-2">
            <Link
              href={`/episodes/${episode.slug}`}
              className="focus-visible:outline-none focus-visible:underline"
            >
              {episode.title}
            </Link>
          </h3>
          {episode.subtitle && (
            <p className="text-xs text-text-muted mt-1 line-clamp-1">{episode.subtitle}</p>
          )}
          {episode.guestNames.length > 0 && (
            <p className="text-xs text-cyan font-mono mt-1">
              with {episode.guestNames.join(", ")}
            </p>
          )}
          <p className="text-sm text-text-secondary mt-2 leading-relaxed line-clamp-3">
            {episode.summaryShort}
          </p>
        </div>

        {/* Topics */}
        {episode.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {episode.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="topic">
                {topic}
              </Badge>
            ))}
          </div>
        )}

        {/* Platform CTAs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {episode.platforms.spotify && (
            <a
              href={episode.platforms.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spotify text-xs py-1.5 px-3"
              aria-label={`Listen to "${episode.title}" on Spotify`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify
            </a>
          )}
          {episode.platforms.youtube && (
            <a
              href={episode.platforms.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-youtube text-xs py-1.5 px-3"
              aria-label={`Watch "${episode.title}" on YouTube`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          )}
          <Link
            href={`/episodes/${episode.slug}`}
            className="btn-secondary text-xs py-1.5 px-3"
            aria-label={`Read show notes for "${episode.title}"`}
          >
            Show Notes →
          </Link>
        </div>
      </div>
    </article>
  );
}
