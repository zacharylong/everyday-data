"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Fuse from "fuse.js";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import type { EpisodeCard as EpisodeCardType } from "@/types/episode";
import type { SearchableEpisode } from "@/lib/search";
import { TOPICS } from "@/types/episode";

interface ArchiveClientProps {
  episodes: EpisodeCardType[];
  searchIndex: SearchableEpisode[];
}

export default function ArchiveClient({ episodes, searchIndex }: ArchiveClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeTopic, setActiveTopic] = useState(searchParams.get("topic") ?? "");

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
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
      }),
    [searchIndex]
  );

  // Sync URL params on filter change
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (activeTopic) params.set("topic", activeTopic);
    const paramStr = params.toString();
    router.replace(paramStr ? `${pathname}?${paramStr}` : pathname, { scroll: false });
  }, [query, activeTopic, pathname, router]);

  const filtered = useMemo(() => {
    let result = episodes;

    // Text search via Fuse
    if (query.trim().length >= 2) {
      const slugHits = new Set(fuse.search(query).map((r) => r.item.slug));
      result = result.filter((ep) => slugHits.has(ep.slug));
    }

    // Topic filter
    if (activeTopic) {
      result = result.filter((ep) => ep.topics.includes(activeTopic));
    }

    return result;
  }, [episodes, query, activeTopic, fuse]);

  function clearFilters() {
    setQuery("");
    setActiveTopic("");
  }

  const hasFilters = query.length > 0 || activeTopic.length > 0;

  return (
    <div>
      {/* Search + filter bar */}
      <div className="mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <label htmlFor="episode-search" className="sr-only">
            Search episodes
          </label>
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            id="episode-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search episodes, guests, topics…"
            className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet transition-colors"
          />
        </div>

        {/* Topic filter chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          <button
            onClick={() => setActiveTopic("")}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
              activeTopic === ""
                ? "bg-violet text-white border-violet"
                : "bg-surface border-border text-text-secondary hover:border-violet/50 hover:text-text-primary"
            }`}
          >
            All topics
          </button>
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setActiveTopic(activeTopic === topic ? "" : topic)}
              aria-pressed={activeTopic === topic}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                activeTopic === topic
                  ? "bg-violet text-white border-violet"
                  : "bg-surface border-border text-text-secondary hover:border-violet/50 hover:text-text-primary"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-text-muted font-mono">
          {filtered.length === episodes.length
            ? `${episodes.length} episodes`
            : `${filtered.length} of ${episodes.length} episodes`}
        </p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-cyan hover:text-white transition-colors font-mono"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ep) => (
            <EpisodeCard key={ep.slug} episode={ep} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg mb-2">No episodes found</p>
          <p className="text-text-muted text-sm mb-6">
            Try a different search term or topic filter.
          </p>
          <button onClick={clearFilters} className="btn-secondary text-sm">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
