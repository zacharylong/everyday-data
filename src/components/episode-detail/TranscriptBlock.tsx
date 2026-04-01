"use client";

import { useState } from "react";

interface TranscriptBlockProps {
  transcript: string;
}

export default function TranscriptBlock({ transcript }: TranscriptBlockProps) {
  const [expanded, setExpanded] = useState(false);

  if (!transcript?.trim()) return null;

  // Parse speaker lines: "**Name:** text" -> structured segments
  const lines = transcript.split("\n").filter((l) => l.trim());

  const segments: { speaker: string; text: string }[] = [];
  let currentSpeaker = "";
  let currentText: string[] = [];

  for (const line of lines) {
    const speakerMatch = line.match(/^\*\*([^*]+)\*\*:\s*(.*)$/);
    if (speakerMatch) {
      if (currentSpeaker && currentText.length) {
        segments.push({ speaker: currentSpeaker, text: currentText.join(" ") });
      }
      currentSpeaker = speakerMatch[1];
      currentText = [speakerMatch[2]];
    } else if (currentSpeaker) {
      currentText.push(line);
    }
  }
  if (currentSpeaker && currentText.length) {
    segments.push({ speaker: currentSpeaker, text: currentText.join(" ") });
  }

  const preview = segments.slice(0, 4);
  const displayed = expanded ? segments : preview;
  const hasMore = segments.length > preview.length;

  return (
    <section aria-labelledby="transcript-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="transcript-heading" className="font-heading font-semibold text-text-primary text-xl">
          Transcript
        </h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-mono text-cyan hover:text-white transition-colors"
          aria-expanded={expanded}
          aria-controls="transcript-content"
        >
          {expanded ? "Collapse ↑" : "Expand full transcript ↓"}
        </button>
      </div>

      <div
        id="transcript-content"
        className={`relative rounded-xl bg-surface border border-border overflow-hidden transition-all duration-300 ${
          !expanded ? "max-h-[500px]" : ""
        }`}
      >
        <div className="p-6 space-y-5">
          {segments.length > 0 ? (
            displayed.map((seg, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-20 shrink-0">
                  <span className="font-mono text-xs font-semibold text-cyan whitespace-nowrap">
                    {seg.speaker}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">{seg.text}</p>
              </div>
            ))
          ) : (
            // Fallback: raw text
            <pre className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap font-body">
              {expanded ? transcript : transcript.slice(0, 1200) + (transcript.length > 1200 ? "…" : "")}
            </pre>
          )}
        </div>

        {/* Fade overlay when collapsed */}
        {!expanded && hasMore && (
          <div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      {!expanded && hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => setExpanded(true)}
            className="btn-secondary text-sm"
            aria-controls="transcript-content"
          >
            Read full transcript
          </button>
        </div>
      )}
    </section>
  );
}
