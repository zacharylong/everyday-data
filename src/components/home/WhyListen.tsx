export default function WhyListen() {
  const reasons = [
    {
      heading: "Real use cases, not demos",
      body: "Every episode focuses on what actually happened — implementation decisions, failures, and lessons — not polished case studies.",
    },
    {
      heading: "Grounded in practice",
      body: "Patricia and Zac bring context from institutional research, enterprise analytics, and consulting. They ask the practitioner questions.",
    },
    {
      heading: "Mental models you can use",
      body: "Each episode is structured to leave you with a framework, a checklist, or a perspective you can bring back to your team the next day.",
    },
    {
      heading: "No hype cycle",
      body: "The show cuts through the AI excitement to ask: what does this actually mean for data teams? What's real and what's marketing?",
    },
    {
      heading: "Relevant for leaders and ICs",
      body: "Whether you're deciding strategy or writing SQL, the conversations speak to both the organizational and technical dimensions.",
    },
    {
      heading: "Evergreen episodes",
      body: "Show notes, transcripts, timestamps, and resource links make each episode a durable reference — not just audio you listen to once.",
    },
  ];

  return (
    <section className="section-padding bg-midnight-2" aria-labelledby="why-heading">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
            Why listen
          </p>
          <h2 id="why-heading" className="font-heading font-bold text-display-md text-text-primary">
            Built for people who do the work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div key={reason.heading} className="relative">
              <div className="flex items-start gap-4">
                <span
                  className="font-mono text-xs text-text-muted mt-1 w-5 shrink-0"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-text-primary mb-1.5">
                    {reason.heading}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{reason.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
