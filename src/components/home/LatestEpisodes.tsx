import Link from "next/link";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import type { EpisodeCard as EpisodeCardType } from "@/types/episode";

interface LatestEpisodesProps {
  episodes: EpisodeCardType[];
}

export default function LatestEpisodes({ episodes }: LatestEpisodesProps) {
  if (!episodes.length) return null;

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
          <Link
            href="/episodes"
            className="text-sm text-text-secondary hover:text-white transition-colors shrink-0"
          >
            Browse the archive →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((ep) => (
            <EpisodeCard key={ep.slug} episode={ep} />
          ))}
        </div>
      </div>
    </section>
  );
}
