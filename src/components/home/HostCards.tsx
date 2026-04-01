export default function HostCards() {
  const hosts = [
    {
      name: "Patricia",
      role: "Co-host",
      bio: "MS in Business Analytics & AI from NYU Stern. Background in data strategy, analytics operations, and enterprise AI implementation. Brings a practitioner lens to how organizations build and scale data capabilities.",
      initials: "P",
      accent: "violet",
      linkedin: "#",
    },
    {
      name: "Zac",
      role: "Co-host",
      bio: "MS in Business Analytics & AI from NYU Stern, B.S. Computer Science from Auburn. Technical Business Analyst with experience in institutional research, analytics consulting, and data engineering. Also a content creator covering data, books, and film.",
      initials: "Z",
      accent: "cyan",
      linkedin: "https://linkedin.com/in/zacharylong",
    },
  ];

  return (
    <section className="section-padding bg-midnight" aria-labelledby="hosts-heading">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
            Your hosts
          </p>
          <h2 id="hosts-heading" className="font-heading font-bold text-display-md text-text-primary">
            Who&apos;s in the room
          </h2>
          <p className="text-text-secondary mt-3 leading-relaxed">
            Two NYU Stern alumni who met in the MS in Business Analytics & AI
            program and kept the conversation going. Everyday Data is what
            happens when you give data practitioners a microphone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {hosts.map((host) => (
            <div
              key={host.name}
              className="p-6 rounded-xl bg-surface border border-border hover:border-violet/40 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar placeholder */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-xl flex-shrink-0 ${
                    host.accent === "violet"
                      ? "bg-violet/20 text-violet-light border-2 border-violet/30"
                      : "bg-cyan/10 text-cyan border-2 border-cyan/30"
                  }`}
                  aria-hidden="true"
                >
                  {host.initials}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-primary text-lg leading-none">
                    {host.name}
                  </h3>
                  <p className="font-mono text-xs text-text-muted mt-1">{host.role}</p>
                  <p className="font-mono text-xs text-cyan mt-1">NYU Stern · MS Analytics & AI</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{host.bio}</p>
              {host.linkedin !== "#" && (
                <a
                  href={host.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-cyan transition-colors font-mono"
                  aria-label={`${host.name}'s LinkedIn profile (opens in new tab)`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
