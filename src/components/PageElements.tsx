import { ArrowRight, type Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Seo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = `${title} | Cellular Journeys`;
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (meta) meta.content = description;
  }, [description, title]);
  return null;
}

export function PageHeader({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div className="page-shell">
        <div className="page-header__inner">
          <h1 className="display">{title}</h1>
          <p className="text-muted">{intro}</p>
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </header>
  );
}

export function SectionHeading({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <h2 className="display">{title}</h2>
      {intro && <p className="text-muted">{intro}</p>}
    </div>
  );
}

export function IconCard({
  icon: IconComponent,
  title,
  children,
  action,
}: {
  icon: Icon;
  title: string;
  children: ReactNode;
  action?: { label: string; to: string };
}) {
  return (
    <article className="icon-card">
      <div className="icon-card__heading">
        <span className="icon-card__icon">
          <IconComponent size={24} weight="duotone" aria-hidden />
        </span>
        <h3>{title}</h3>
      </div>
      <div className="icon-card__body">{children}</div>
      {action && (
        <Link className="inline-action mt-5 self-start" to={action.to}>
          {action.label} <ArrowRight size={18} aria-hidden />
        </Link>
      )}
    </article>
  );
}

export function Callout({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <aside className="callout">
      <h2 className="display">{title}</h2>
      <div className="callout__body">{children}</div>
      {action && <div className="mt-6 flex flex-wrap gap-3">{action}</div>}
    </aside>
  );
}
