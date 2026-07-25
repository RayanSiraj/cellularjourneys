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
  return (
    <NavLink
      to="/"
      className="brand-lockup"
      aria-label="Cellular Journeys home"
    >
      <img
        src="/images/cellular-journeys-logo.webp"
        alt=""
        width="1200"
        height="561"
      />
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
      <header className="site-header sticky top-0 z-30">
        <div className="page-shell flex h-[4.5rem] items-center justify-between gap-5">
          <Wordmark />
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {primaryNav.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `primary-nav-link${isActive ? " active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink to="/donate" className="btn btn-primary text-sm">
              Donate
            </NavLink>
          </nav>
          <div className="lg:hidden">
            <button
              className="btn btn-secondary"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="page-shell grid border-t border-[var(--line)] py-4 lg:hidden"
            aria-label="Mobile"
          >
            {primaryNav.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `mobile-nav-link${isActive ? " active" : ""}`
                }
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
      <footer className="site-footer">
        <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-md text-sm text-muted">
              A 501(c)(3) nonprofit advancing cancer education, scientific
              literacy, research awareness, and community engagement.
            </p>
            <p className="utility mt-3 text-xs text-muted">EIN 33-4407653</p>
          </div>
          <div>
            <h2 className="display text-lg font-bold">Visit</h2>
            <address className="mt-4 text-sm not-italic text-muted">
              1 UNF Drive, Building 59
              <br />
              University of North Florida
              <br />
              Jacksonville, FL 32224
            </address>
          </div>
          <div>
            <h2 className="display text-lg font-bold">Connect</h2>
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
