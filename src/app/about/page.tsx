import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Everyday Data is a practical podcast about data, AI, and how teams make them useful. Hosted by Patricia and Zac — NYU Stern MS in Business Analytics & AI alumni.",
};

export default function AboutPage() {
  return (
    <div className="bg-midnight min-h-screen">
      {/* Hero */}
      <div className="bg-midnight-2 border-b border-border">
        <div className="section-container py-14 sm:py-20">
          <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
            About the show
          </p>
          <h1 className="font-heading font-bold text-display-lg text-text-primary mb-5 max-w-3xl">
            A podcast built by data people, for data people
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed max-w-2xl">
            Everyday Data is a practical podcast about data and AI in the real
            world — enterprise use cases, implementation decisions, analytics
            culture, and the grounded conversations that rarely make it into
            white papers.
          </p>
        </div>
      </div>

      <div className="section-container py-12 sm:py-16 space-y-16">
        {/* The show */}
        <section aria-labelledby="show-heading" className="max-w-3xl">
          <h2 id="show-heading" className="font-heading font-bold text-2xl text-text-primary mb-5">
            What is Everyday Data?
          </h2>
          <div className="prose-podcast space-y-4">
            <p>
              Everyday Data started from a simple frustration: there are too
              many podcasts that talk about data and AI in the abstract, and not
              enough that ask what it actually takes to implement it, govern it,
              and make it useful for real organizations.
            </p>
            <p>
              The show covers the full spectrum of practical data work —
              from data engineering and analytics culture, to AI
              implementation and organizational transformation. We&apos;re
              interested in what actually happens in the room, not the
              polished version that gets written up later.
            </p>
            <p>
              Episodes are designed to be useful long after you listen. Every
              episode page includes show notes, chapters, transcripts, and
              resource links — so you can reference them when you need to
              bring a framework or use case back to your team.
            </p>
          </div>
        </section>

        <div className="gradient-divider" />

        {/* Hosts */}
        <section aria-labelledby="hosts-about-heading">
          <h2 id="hosts-about-heading" className="font-heading font-bold text-2xl text-text-primary mb-8">
            Your hosts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
            {[
              {
                name: "Patricia",
                initials: "P",
                accent: "violet",
                bio: [
                  "MS in Business Analytics & AI from NYU Stern. Background in data strategy, analytics operations, and enterprise AI planning. She brings the organizational and strategic lens to the show — how do companies actually build and sustain data capabilities?",
                  "Patricia is interested in the people and culture side of data transformation: why some organizations get traction and others stay stuck, what leadership and incentive structures drive or kill analytics adoption, and what it takes to make AI a durable capability rather than a recurring pilot.",
                ],
                linkedin: "#",
              },
              {
                name: "Zac",
                initials: "Z",
                accent: "cyan",
                bio: [
                  "MS in Business Analytics & AI from NYU Stern, B.S. Computer Science from Auburn. Technical Business Analyst at SUNY Farmingdale, with experience spanning institutional research, data engineering, and analytics consulting.",
                  "Zac brings the technical practitioner's perspective — what does it actually look like to build and maintain data systems, how do AI coding tools change the day-to-day of analytical work, and where do well-intentioned data initiatives break down in practice. Also a content creator: YouTube book reviews (sci-fi & fantasy) and the Zac On Films channel.",
                ],
                linkedin: "https://linkedin.com/in/zacharylong",
              },
            ].map((host) => (
              <div key={host.name} className="p-6 rounded-xl bg-surface border border-border">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-2xl flex-shrink-0 ${
                      host.accent === "violet"
                        ? "bg-violet/20 text-violet-light border-2 border-violet/30"
                        : "bg-cyan/10 text-cyan border-2 border-cyan/30"
                    }`}
                    aria-hidden="true"
                  >
                    {host.initials}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-text-primary text-xl">{host.name}</h3>
                    <p className="font-mono text-xs text-cyan">NYU Stern · MS Analytics & AI</p>
                  </div>
                </div>
                <div className="prose-podcast space-y-3">
                  {host.bio.map((para, i) => (
                    <p key={i} className="text-sm">{para}</p>
                  ))}
                </div>
                {host.linkedin !== "#" && (
                  <a
                    href={host.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-cyan transition-colors mt-4 font-mono"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="gradient-divider" />

        {/* NYU connection */}
        <section aria-labelledby="nyu-heading" className="max-w-3xl">
          <h2 id="nyu-heading" className="font-heading font-bold text-2xl text-text-primary mb-5">
            The NYU connection
          </h2>
          <div className="prose-podcast space-y-4">
            <p>
              Patricia and Zac met as students in the NYU Stern School of
              Business MS in Business Analytics & AI program. The program
              brings together practitioners from technology, finance, consulting,
              and research who are serious about the business application of data
              and AI — not just the models, but the decisions, processes, and
              organizations around them.
            </p>
            <p>
              Everyday Data is, in a sense, the ongoing conversation that
              started there — what does this material actually look like in the
              real world? Where do the clean academic frameworks run into
              organizational reality? What do people building this stuff at scale
              wish they had known earlier?
            </p>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet/10 border border-violet/25">
            <span className="font-mono text-xs text-cyan">NYU Stern</span>
            <span className="text-text-muted text-xs">·</span>
            <span className="font-mono text-xs text-text-secondary">MS in Business Analytics & AI</span>
          </div>
        </section>

        <div className="gradient-divider" />

        {/* CTA */}
        <section aria-labelledby="contact-heading" className="max-w-2xl">
          <h2 id="contact-heading" className="font-heading font-bold text-2xl text-text-primary mb-4">
            Get in touch
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Want to pitch a guest, suggest a topic, or just say hello?
            We&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:hello@everydaydata.show"
              className="btn-primary"
            >
              hello@everydaydata.show
            </a>
            <Link href="/episodes" className="btn-secondary">
              Browse episodes
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
