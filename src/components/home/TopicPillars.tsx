import Link from "next/link";
import { TOPICS } from "@/types/episode";

const TOPIC_ICONS: Record<string, string> = {
  "Data Foundations": "⬡",
  "AI in Practice": "◈",
  "Analytics Culture": "◎",
  "Operational AI": "⬢",
  "Governance & Trust": "◆",
  "Engineering & Resilience": "⟁",
  "Career & Leadership": "◉",
  "Enterprise Transformation": "⬟",
};

export default function TopicPillars() {
  return (
    <section className="section-padding bg-midnight" aria-labelledby="topics-heading">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
              What we cover
            </p>
            <h2 id="topics-heading" className="font-heading font-bold text-display-md text-text-primary">
              Eight topic areas
            </h2>
          </div>
          <Link
            href="/episodes"
            className="text-sm text-text-secondary hover:text-white transition-colors shrink-0"
          >
            Browse all episodes →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {TOPICS.map((topic) => (
            <Link
              key={topic}
              href={`/episodes?topic=${encodeURIComponent(topic)}`}
              className="group p-4 rounded-xl bg-surface border border-border hover:border-violet/50 hover:bg-surface-2 transition-all duration-200 flex items-start gap-3"
            >
              <span
                className="text-lg text-violet-light group-hover:text-cyan transition-colors mt-0.5 font-mono leading-none"
                aria-hidden="true"
              >
                {TOPIC_ICONS[topic] ?? "◇"}
              </span>
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
                {topic}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
