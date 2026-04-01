import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllSlugs,
  getEpisodeBySlug,
  getRelatedEpisodes,
  formatDate,
  formatDuration,
} from "@/lib/episodes";
import { SITE_URL } from "@/lib/basePath";
import ListenBar from "@/components/episode-detail/ListenBar";
import ChapterList from "@/components/episode-detail/ChapterList";
import ResourceLinks from "@/components/episode-detail/ResourceLinks";
import TranscriptBlock from "@/components/episode-detail/TranscriptBlock";
import RelatedEpisodes from "@/components/episode-detail/RelatedEpisodes";
import ShareButtons from "@/components/episode-detail/ShareButtons";
import Badge from "@/components/ui/Badge";
import JsonLd from "@/components/ui/JsonLd";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const episode = await getEpisodeBySlug(params.slug);
  if (!episode) return {};

  const title = episode.seo?.metaTitle ?? `${episode.title} | Everyday Data`;
  const description =
    episode.seo?.metaDescription ?? episode.summaryShort;
  const ogImage = episode.seo?.ogImage ?? episode.coverImage ?? "/og-default.png";
  const canonical = `${SITE_URL}/episodes/${episode.slug}`;

  return {
    title: episode.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: episode.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function EpisodeDetailPage({ params }: Props) {
  const [episode, related] = await Promise.all([
    getEpisodeBySlug(params.slug),
    getEpisodeBySlug(params.slug).then((ep) =>
      ep ? getRelatedEpisodes(ep, 3) : []
    ),
  ]);

  if (!episode) notFound();

  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.summaryShort,
    url: `${SITE_URL}/episodes/${episode.slug}`,
    datePublished: episode.publishedAt,
    duration: `PT${episode.duration.replace(":", "H").replace(":", "M")}S`,
    image: episode.coverImage ?? `${SITE_URL}/og-default.png`,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Everyday Data",
      url: SITE_URL,
    },
    author: [
      { "@type": "Person", name: "Patricia" },
      { "@type": "Person", name: "Zachary Long" },
      ...(episode.guestProfiles?.map((g) => ({
        "@type": "Person",
        name: g.name,
        ...(g.company ? { worksFor: { "@type": "Organization", name: g.company } } : {}),
      })) ?? []),
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Episodes", item: `${SITE_URL}/episodes` },
      { "@type": "ListItem", position: 3, name: episode.title, item: `${SITE_URL}/episodes/${episode.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={episodeSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Sticky listen bar */}
      <ListenBar title={episode.title} platforms={episode.platforms} />

      <div className="bg-midnight min-h-screen">
        {/* Hero */}
        <div className="relative bg-midnight-2 border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-violet-radial opacity-50 pointer-events-none" aria-hidden="true" />
          <div className="section-container py-10 sm:py-14 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <li><Link href="/" className="hover:text-cyan transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/episodes" className="hover:text-cyan transition-colors">Episodes</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-text-secondary truncate max-w-[200px]">{episode.title}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              {/* Episode number + date */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {episode.episodeNumber && (
                  <span className="font-mono text-xs bg-violet/15 border border-violet/30 text-cyan px-2.5 py-1 rounded-md">
                    EP. {String(episode.episodeNumber).padStart(3, "0")}
                  </span>
                )}
                <time dateTime={episode.publishedAt} className="font-mono text-xs text-text-muted">
                  {formatDate(episode.publishedAt)}
                </time>
                <span className="font-mono text-xs text-text-muted">
                  {formatDuration(episode.duration)}
                </span>
              </div>

              <h1 className="font-heading font-bold text-display-md text-text-primary mb-3 leading-tight">
                {episode.title}
              </h1>
              {episode.subtitle && (
                <p className="text-lg text-text-secondary mb-5">{episode.subtitle}</p>
              )}

              {/* Guests */}
              {episode.guestNames.length > 0 && (
                <p className="text-sm text-cyan font-mono mb-5">
                  Featuring: {episode.guestNames.join(", ")}
                </p>
              )}

              {/* Topics */}
              {episode.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {episode.topics.map((t) => (
                    <Link key={t} href={`/episodes?topic=${encodeURIComponent(t)}`}>
                      <Badge variant="topic">{t}</Badge>
                    </Link>
                  ))}
                </div>
              )}

              <ShareButtons slug={episode.slug} title={episode.title} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="section-container py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
            {/* Left column — main content */}
            <div className="space-y-12 min-w-0">
              {/* Short summary */}
              <section aria-labelledby="summary-heading">
                <h2 id="summary-heading" className="font-heading font-semibold text-text-primary text-xl mb-3">
                  About This Episode
                </h2>
                <p className="text-text-secondary leading-relaxed">{episode.summaryShort}</p>
              </section>

              {/* Key takeaways */}
              {episode.takeaways?.length > 0 && (
                <section aria-labelledby="takeaways-heading">
                  <h2 id="takeaways-heading" className="font-heading font-semibold text-text-primary text-xl mb-4">
                    Key Takeaways
                  </h2>
                  <ul className="space-y-3">
                    {episode.takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="w-5 h-5 rounded-full bg-violet/20 border border-violet/30 flex items-center justify-center flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          <span className="text-cyan text-[10px] font-mono font-bold">{i + 1}</span>
                        </span>
                        <p className="text-text-secondary text-sm leading-relaxed">{t}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Show notes */}
              {episode.summaryLong && (
                <section aria-labelledby="shownotes-heading">
                  <h2 id="shownotes-heading" className="font-heading font-semibold text-text-primary text-xl mb-4">
                    Show Notes
                  </h2>
                  <div className="prose-podcast space-y-4">
                    {episode.summaryLong.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              )}

              {/* Resources */}
              {episode.resources?.length > 0 && (
                <ResourceLinks resources={episode.resources} />
              )}

              {/* Transcript */}
              {episode.transcript && (
                <TranscriptBlock transcript={episode.transcript} />
              )}
            </div>

            {/* Right sidebar */}
            <aside className="space-y-8">
              {/* Chapters */}
              {episode.chapters?.length > 0 && (
                <ChapterList chapters={episode.chapters} />
              )}

              {/* Hosts */}
              <section aria-labelledby="hosts-sidebar-heading">
                <h2 id="hosts-sidebar-heading" className="font-heading font-semibold text-text-primary text-base mb-4">
                  Your Hosts
                </h2>
                <div className="space-y-3">
                  {["Patricia", "Zac"].map((name) => (
                    <div key={name} className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border">
                      <div className="w-9 h-9 rounded-full bg-violet/20 border border-violet/30 flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm text-violet-light">
                        {name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{name}</p>
                        <p className="text-xs font-mono text-text-muted">NYU Stern · MS Analytics & AI</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Guest profiles */}
              {episode.guestProfiles && episode.guestProfiles.length > 0 && (
                <section aria-labelledby="guests-sidebar-heading">
                  <h2 id="guests-sidebar-heading" className="font-heading font-semibold text-text-primary text-base mb-4">
                    {episode.guestProfiles.length === 1 ? "Guest" : "Guests"}
                  </h2>
                  <div className="space-y-3">
                    {episode.guestProfiles.map((g) => (
                      <div key={g.name} className="p-4 rounded-xl bg-surface border border-border">
                        <p className="font-semibold text-text-primary text-sm">{g.name}</p>
                        {g.role && <p className="text-xs text-text-muted">{g.role}</p>}
                        {g.company && <p className="text-xs text-cyan font-mono">{g.company}</p>}
                        {g.bioShort && (
                          <p className="text-xs text-text-secondary mt-2 leading-relaxed">{g.bioShort}</p>
                        )}
                        {g.linkedin && (
                          <a
                            href={g.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-cyan transition-colors mt-2 font-mono"
                          >
                            LinkedIn →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Listen again CTA */}
              <div className="p-5 rounded-xl bg-violet/10 border border-violet/25">
                <p className="text-sm font-semibold text-text-primary mb-3">Enjoyed this episode?</p>
                <p className="text-xs text-text-secondary mb-4">
                  Follow Everyday Data so you never miss a new episode.
                </p>
                <div className="space-y-2">
                  <a
                    href="https://open.spotify.com/show/everydaydata"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-spotify text-xs w-full justify-center"
                  >
                    Follow on Spotify
                  </a>
                  <a
                    href="https://youtube.com/@everydatashow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-youtube text-xs w-full justify-center"
                  >
                    Subscribe on YouTube
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Related episodes — full width below */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <RelatedEpisodes episodes={related} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
