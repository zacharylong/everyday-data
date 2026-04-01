import Link from "next/link";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import type { EpisodeCard as EpisodeCardType } from "@/types/episode";

interface RelatedEpisodesProps {
  episodes: EpisodeCardType[];
}

export default function RelatedEpisodes({ episodes }: RelatedEpisodesProps) {
  if (!episodes.length) return null;

  return (
    <section aria-labelledby="related-heading">
      <div className="flex items-center justify-between mb-6">
        <h2 id="related-heading" className="font-heading font-semibold text-text-primary text-xl">
          Related Episodes
        </h2>
        <Link
          href="/episodes"
          className="text-sm text-text-muted hover:text-cyan transition-colors font-mono"
        >
          All episodes →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {episodes.map((ep) => (
          <EpisodeCard key={ep.slug} episode={ep} />
        ))}
      </div>
    </section>
  );
}
