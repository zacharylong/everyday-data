import { formatDate, formatDuration } from "@/lib/utils";

interface EpisodeMetaProps {
  publishedAt: string;
  duration: string;
  episodeNumber?: number;
  className?: string;
}

export default function EpisodeMeta({
  publishedAt,
  duration,
  episodeNumber,
  className = "",
}: EpisodeMetaProps) {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs text-text-muted ${className}`}>
      {episodeNumber !== undefined && (
        <>
          <span>EP. {String(episodeNumber).padStart(3, "0")}</span>
          <span aria-hidden="true">·</span>
        </>
      )}
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span>{formatDuration(duration)}</span>
    </div>
  );
}
