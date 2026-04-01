import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Listen",
  description:
    "Find Everyday Data on Spotify, Apple Podcasts, YouTube, and RSS. Choose your platform and subscribe.",
};

const PLATFORMS = [
  {
    name: "Spotify",
    description: "Follow on Spotify to get new episodes automatically.",
    cta: "Follow on Spotify",
    href: "https://open.spotify.com/show/everydaydata",
    bg: "bg-[#1DB954]",
    textColor: "text-black",
    hoverBg: "hover:bg-[#1ed760]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
    features: ["Auto-downloads new episodes", "Offline listening", "Speed controls", "Chapters support"],
  },
  {
    name: "Apple Podcasts",
    description: "Subscribe on Apple Podcasts for automatic episode delivery.",
    cta: "Subscribe on Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/everyday-data",
    bg: "bg-gradient-to-br from-[#872EC4] to-[#D668FE]",
    textColor: "text-white",
    hoverBg: "hover:opacity-90",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.552 4.794c2.833 0 5.157 1.04 6.994 2.849 1.814 1.797 2.726 4.142 2.726 6.956 0 3.555-1.337 5.964-2.337 7.115-.19.22-.41.331-.662.331-.19 0-.38-.063-.533-.19l-.01-.01a.715.715 0 01-.247-.543c0-.155.05-.31.145-.441 1.12-1.424 2.056-3.51 2.056-6.266 0-2.394-.795-4.378-2.365-5.904-1.565-1.52-3.618-2.295-6.092-2.295-2.474 0-4.526.775-6.092 2.295C3.906 10.18 3.11 12.164 3.11 14.558c0 2.76.964 4.853 2.057 6.266.097.13.145.285.145.44a.715.715 0 01-.247.544l-.01.01a.77.77 0 01-.532.19c-.254 0-.474-.112-.663-.33C2.86 20.576 1.524 18.167 1.524 14.612c0-2.814.912-5.159 2.726-6.956 1.837-1.81 4.161-2.85 6.994-2.85zm-.014 3.381c1.745 0 3.175.594 4.29 1.71 1.099 1.105 1.655 2.52 1.655 4.2 0 2.007-.58 3.558-1.117 4.618-.094.19-.241.285-.44.285a.47.47 0 01-.237-.063.483.483 0 01-.255-.426c0-.073.016-.148.047-.22.618-1.266 1.025-2.631 1.025-4.194 0-1.317-.418-2.413-1.24-3.255-.823-.842-1.909-1.27-3.228-1.27-1.32 0-2.405.428-3.228 1.27-.823.842-1.24 1.938-1.24 3.255 0 1.563.407 2.928 1.024 4.194.032.072.047.147.047.22a.483.483 0 01-.254.426.47.47 0 01-.238.063c-.198 0-.345-.095-.44-.285-.536-1.06-1.117-2.611-1.117-4.618 0-1.68.556-3.095 1.656-4.2 1.114-1.116 2.544-1.71 4.29-1.71zm-.014 3.297c.842 0 1.53.284 2.07.852.54.568.81 1.296.81 2.16 0 .998-.308 2.52-.923 4.555a2.13 2.13 0 01-.633 1.007c-.314.272-.694.408-1.138.408-.444 0-.824-.136-1.139-.408a2.13 2.13 0 01-.632-1.007c-.615-2.036-.924-3.557-.924-4.555 0-.864.27-1.592.81-2.16.54-.568 1.228-.852 2.07-.852z" />
      </svg>
    ),
    features: ["Transcript display", "Chapters navigation", "Cross-device sync", "Smart speed"],
  },
  {
    name: "YouTube",
    description: "Subscribe on YouTube to watch video episodes and highlights.",
    cta: "Subscribe on YouTube",
    href: "https://youtube.com/@everydatashow",
    bg: "bg-[#FF0000]",
    textColor: "text-white",
    hoverBg: "hover:bg-[#cc0000]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    features: ["Video format available", "Chapters in timeline", "Subtitles / captions", "Free with YouTube app"],
  },
  {
    name: "RSS Feed",
    description: "Add the RSS feed to any podcast app that supports RSS.",
    cta: "Copy RSS feed URL",
    href: "/rss.xml",
    bg: "bg-[#F26522]",
    textColor: "text-white",
    hoverBg: "hover:bg-[#d4551c]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
      </svg>
    ),
    features: ["Works in any podcast app", "Overcast, Pocket Casts, Castro", "Add via URL", "Standard RSS format"],
  },
];

export default function ListenPage() {
  return (
    <div className="bg-midnight min-h-screen">
      {/* Header */}
      <div className="bg-midnight-2 border-b border-border">
        <div className="section-container py-14 sm:py-20">
          <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
            All platforms
          </p>
          <h1 className="font-heading font-bold text-display-lg text-text-primary mb-4">
            Listen & Watch
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed max-w-xl">
            Find Everyday Data wherever you listen to podcasts. Pick your
            platform and subscribe so you never miss an episode.
          </p>
        </div>
      </div>

      <div className="section-container py-12 sm:py-16">
        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="card flex flex-col p-6 gap-5"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl ${platform.bg} flex items-center justify-center flex-shrink-0 ${platform.textColor}`}>
                  {platform.icon}
                </div>
                <div>
                  <h2 className="font-heading font-bold text-text-primary text-lg">{platform.name}</h2>
                  <p className="text-sm text-text-secondary mt-1">{platform.description}</p>
                </div>
              </div>

              <ul className="space-y-1.5">
                {platform.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="w-1 h-1 rounded-full bg-cyan flex-shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={platform.href}
                target={platform.href.startsWith("http") ? "_blank" : undefined}
                rel={platform.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${platform.bg} ${platform.textColor} ${platform.hoverBg}`}
                aria-label={`${platform.cta} (opens in new tab)`}
              >
                {platform.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Start here prompt */}
        <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-surface border border-border">
          <p className="font-mono text-xs text-cyan mb-3 tracking-widest uppercase">New here?</p>
          <h2 className="font-heading font-bold text-2xl text-text-primary mb-3">
            Not sure where to start?
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            We&apos;ve curated a set of recommended first episodes — designed to
            give you a feel for the show and jump straight into useful
            conversations.
          </p>
          <Link href="/episodes" className="btn-primary">
            Browse recommended episodes →
          </Link>
        </div>
      </div>
    </div>
  );
}
