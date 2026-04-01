"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";

const NAV_LINKS = [
  { label: "Episodes", href: "/episodes" },
  { label: "About", href: "/about" },
  { label: "Listen", href: "/listen" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-midnight/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none"
              aria-label="Everyday Data — Home"
            >
              <div className="w-8 h-8 rounded-lg bg-violet flex items-center justify-center flex-shrink-0 group-hover:bg-violet-light transition-colors duration-200">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x="1" y="10" width="2.5" height="5" rx="0.5" fill="white" opacity="0.6" />
                  <rect x="4.5" y="6" width="2.5" height="9" rx="0.5" fill="white" opacity="0.8" />
                  <rect x="8" y="3" width="2.5" height="12" rx="0.5" fill="white" />
                  <rect x="11.5" y="7" width="2.5" height="8" rx="0.5" fill="white" opacity="0.7" />
                  <circle cx="2.25" cy="8.5" r="1" fill="#22d3ee" />
                  <circle cx="5.75" cy="4.5" r="1" fill="#22d3ee" />
                  <circle cx="9.25" cy="1.5" r="1" fill="#22d3ee" />
                  <circle cx="12.75" cy="5.5" r="1" fill="#22d3ee" />
                </svg>
              </div>
              <div>
                <span className="font-heading font-bold text-text-primary text-sm leading-none block">
                  Everyday Data
                </span>
                <span className="font-mono text-[10px] text-text-muted leading-none">
                  with Patricia & Zac
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-white bg-violet/20 border border-violet/30"
                      : "text-text-secondary hover:text-white hover:bg-surface"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://open.spotify.com/show/0YoImym7yRsC6wGDxCrnRQ"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 btn-primary text-sm py-2 px-4"
                aria-label="Listen on Spotify (opens in new tab)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Listen Free
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-surface transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3 6H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} links={NAV_LINKS} onClose={() => setMobileOpen(false)} />

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-18" aria-hidden="true" />
    </>
  );
}
