import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllEpisodeCards } from "@/lib/episodes";
import { buildSearchIndex } from "@/lib/search";
import ArchiveClient from "@/components/episodes/ArchiveClient";

export const metadata: Metadata = {
  title: "Episodes",
  description:
    "Browse all Everyday Data episodes. Search by topic, guest, or keyword. Each episode includes show notes, transcripts, chapters, and resource links.",
  openGraph: {
    title: "Episodes — Everyday Data",
    description: "Browse all episodes of Everyday Data. Filter by topic, search by keyword.",
  },
};

export default async function EpisodesPage() {
  const episodes = await getAllEpisodeCards();
  const searchIndex = buildSearchIndex(episodes);

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
            Every conversation, fully indexed. Show notes, transcripts,
            chapters, and resources on every episode page.
          </p>
        </div>
      </div>

      {/* Archive content */}
      <div className="section-container py-10 sm:py-14">
        <Suspense fallback={
          <div className="text-center py-20 text-text-muted font-mono text-sm">
            Loading episodes…
          </div>
        }>
          <ArchiveClient episodes={episodes} searchIndex={searchIndex} />
        </Suspense>
      </div>
    </div>
  );
}
