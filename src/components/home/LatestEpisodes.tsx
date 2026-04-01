import type { YouTubeVideo } from "@/lib/youtube";
import { formatDate } from "@/lib/utils";

interface LatestEpisodesProps {
  youtubeVideos: YouTubeVideo[];
}

export default function LatestEpisodes({ youtubeVideos }: LatestEpisodesProps) {
  if (!youtubeVideos.length) return null;

  return (
    <section className="section-padding bg-midnight" aria-labelledby="latest-heading">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
              Fresh off the feed
            </p>
            <h2
              id="latest-heading"
              className="font-heading font-bold text-display-md text-text-primary"
            >
              Latest episodes
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@EverydayDataWithPnZ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-white transition-colors shrink-0"
          >
            View all on YouTube →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeVideos.map((video) => (
            <article
              key={video.videoId}
              className="card group flex flex-col h-full"
            >
              {/* Thumbnail */}
              <div className="relative bg-midnight-3 overflow-hidden">
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch "${video.title}" on YouTube`}
                  tabIndex={-1}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnailUrl}
                    alt={`Thumbnail for: ${video.title}`}
                    className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </a>
                {/* YouTube badge */}
                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-1 px-2 py-1 bg-midnight/80 backdrop-blur-sm rounded text-[10px] font-mono text-text-muted border border-border">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <time
                  dateTime={video.publishedDate}
                  className="font-mono text-xs text-text-muted"
                >
                  {formatDate(video.publishedDate)}
                </time>

                <h3 className="font-heading font-semibold text-text-primary text-base leading-snug group-hover:text-white transition-colors">
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:outline-none focus-visible:underline"
                  >
                    {video.title}
                  </a>
                </h3>

                {video.description && (
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
                    {video.description}
                  </p>
                )}

                {/* CTA */}
                <div className="pt-1">
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-youtube text-xs py-1.5 px-3"
                    aria-label={`Watch "${video.title}" on YouTube`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
