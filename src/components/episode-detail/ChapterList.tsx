import type { Chapter } from "@/types/episode";

interface ChapterListProps {
  chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
  if (!chapters?.length) return null;

  return (
    <section aria-labelledby="chapters-heading">
      <h2 id="chapters-heading" className="font-heading font-semibold text-text-primary text-xl mb-4">
        Chapters
      </h2>
      <ol className="space-y-1">
        {chapters.map((chapter, i) => (
          <li
            key={i}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface transition-colors group"
          >
            <span className="font-mono text-xs text-cyan bg-violet/10 border border-violet/20 px-2 py-1 rounded shrink-0 mt-0.5">
              {chapter.timestamp}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
                {chapter.title}
              </p>
              {chapter.note && (
                <p className="text-xs text-text-muted mt-0.5">{chapter.note}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
