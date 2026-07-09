import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const primaryNav = [
  ["About", "/about"],
  ["Platforms", "/platforms"],
  ["Events", "/events"],
  ["Get Involved", "/get-involved"],
  ["Internship", "/internship"],
  ["Governance", "/governance"],
] as const;

function Wordmark() {
  // TODO(client): insert the real logo file when supplied.
  return (
    <NavLink
      to="/"
      className="flex shrink-0 flex-col leading-none no-underline"
      aria-label="Cellular Journeys home"
    >
      <span className="display text-xl font-bold tracking-tight text-[var(--brand-strong)]">
        Cellular Journeys
      </span>
      <span className="mt-1 text-xs font-bold text-[var(--muted)]">
        Learn. Create. Inspire. Impact.
      </span>
    </NavLink>
  );
}

export function SiteLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh]">
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[color:var(--paper)]/95 backdrop-blur-sm">
        <div className="page-shell flex h-20 items-center justify-between gap-5">
          <Wordmark />
          <nav className="hidden items-center gap-4 lg:flex" aria-label="Primary">
            {primaryNav.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-bold no-underline ${
                    isActive
                      ? "text-[var(--brand-strong)] underline decoration-2 underline-offset-8"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink to="/donate" className="btn btn-primary text-sm">
              Donate
            </NavLink>
          </nav>
          <button
            className="btn btn-secondary lg:hidden"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="page-shell grid gap-2 border-t border-[var(--line)] py-4 lg:hidden"
            aria-label="Mobile"
          >
            {primaryNav.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className="rounded-lg px-3 py-3 font-bold no-underline hover:bg-[var(--surface-soft)]"
              >
                {label}
              </NavLink>
            ))}
            <NavLink to="/donate" className="btn btn-primary mt-2">
              Donate
            </NavLink>
          </nav>
        )}
      </header>
      <main id="main-content">
        <Outlet />
      </main>
      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-md text-sm text-muted">
              A 501(c)(3) nonprofit advancing cancer education, scientific
              literacy, research awareness, and community engagement.
            </p>
            <p className="mt-3 text-sm text-muted">EIN 33-4407653</p>
          </div>
          <div>
            <h2 className="font-bold">Visit</h2>
            <address className="mt-4 text-sm not-italic text-muted">
              1 UNF Drive, Building 59
              <br />
              University of North Florida
              <br />
              Jacksonville, FL 32224
            </address>
          </div>
          <div>
            <h2 className="font-bold">Connect</h2>
            <div className="mt-4 grid gap-2 text-sm">
              <NavLink className="brand-link" to="/contact">
                Contact Us
              </NavLink>
              <NavLink className="brand-link" to="/governance">
                Governance &amp; Transparency
              </NavLink>
              <a
                className="brand-link"
                href="https://cancerquest.org/"
                target="_blank"
                rel="noreferrer"
              >
                Visit CancerQuest.org
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
