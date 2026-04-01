import type { Metadata } from "next";
import { fetchYouTubePlaylist, EVERYDAY_DATA_PLAYLIST_ID } from "@/lib/youtube";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Episodes",
  description:
    "Browse all Everyday Data episodes. Practical conversations about Data, AI, and how teams make them work.",
  openGraph: {
    title: "Episodes — Everyday Data",
    description: "Browse all episodes of Everyday Data with Patricia & Zac.",
  },
};

export default async function EpisodesPage() {
  const episodes = await fetchYouTubePlaylist(EVERYDAY_DATA_PLAYLIST_ID, 50);

  return (
    <div className="bg-midnight min-h-screen">
      {/* Page header */}
      <div className="bg-midnight-2 border-b border-border">
        <div className="section-container py-12 sm:py-16">
          <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
            The archive
          </p>
          <h1 className="font-heading font-bold text-display-lg text-text-primary mb-3">
            All Episodes
          </h1>
          <p className="text-text-secondary text-lg max-w-xl leading-relaxed">
            Every conversation, straight from our YouTube playlist. New episodes
            appear here automatically.
          </p>
        </div>
      </div>

      {/* Episode grid */}
      <div className="section-container py-10 sm:py-14">
        {episodes.length === 0 ? (
          <p className="text-center py-20 text-text-muted font-mono text-sm">
            No episodes found. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((video) => (
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

                  <h2 className="font-heading font-semibold text-text-primary text-base leading-snug group-hover:text-white transition-colors">
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-visible:outline-none focus-visible:underline"
                    >
                      {video.title}
                    </a>
                  </h2>

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
        )}
      </div>
    </div>
  );
}
