import Link from "next/link";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import type { EpisodeCard as EpisodeCardType } from "@/types/episode";

interface FeaturedEpisodesProps {
  episodes: EpisodeCardType[];
}

export default function FeaturedEpisodes({ episodes }: FeaturedEpisodesProps) {
  if (!episodes.length) return null;

  return (
    <section className="section-padding bg-midnight-2" aria-labelledby="featured-heading">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
              Start here
            </p>
            <h2
              id="featured-heading"
              className="font-heading font-bold text-display-md text-text-primary"
            >
              Recommended episodes
            </h2>
          </div>
          <Link
            href="/episodes"
            className="text-sm text-text-secondary hover:text-white transition-colors shrink-0"
          >
            View all episodes →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((ep) => (
            <EpisodeCard key={ep.slug} episode={ep} featured={ep.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}
