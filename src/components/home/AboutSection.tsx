export default function AboutSection() {
  const pillars = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      heading: "Enterprise & practical",
      body: "Every episode is grounded in real work — real use cases, real tradeoffs, real teams. Not thought leadership. Actionable perspective.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      heading: "Data, AI & analytics",
      body: "From data foundations and governance to operational AI, ML engineering, and analytics culture — across the full data value chain.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      heading: "For practitioners",
      body: "Made by data people for data people. Whether you're an analytics engineer, data leader, or AI practitioner, there's something useful for you here.",
    },
  ];

  return (
    <section className="section-padding bg-midnight-2" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
            About the show
          </p>
          <h2 id="about-heading" className="font-heading font-bold text-display-md text-text-primary mb-4">
            Data & AI without the noise
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Everyday Data is a podcast about the real work of data and AI — how
            organizations implement it, where it breaks down, what governance
            actually looks like, and why the human side is still the hardest
            part. Hosted by Patricia and Zac, both NYU Stern MS in Business
            Analytics & AI alumni with experience across higher education,
            consulting, and enterprise analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.heading}
              className="p-6 rounded-xl bg-surface border border-border hover:border-violet/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-violet/15 text-violet-light flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                {pillar.heading}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
