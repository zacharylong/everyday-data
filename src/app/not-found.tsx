import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-midnight min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4 max-w-lg">
        <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-4">404</p>
        <h1 className="font-heading font-bold text-display-md text-text-primary mb-4">
          Page not found
        </h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          This page doesn&apos;t exist — or may have moved. Try the episodes
          archive or head back home.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/episodes" className="btn-secondary">
            Browse episodes
          </Link>
        </div>
      </div>
    </div>
  );
}
