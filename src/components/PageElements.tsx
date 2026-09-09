import type { Icon } from "@phosphor-icons/react";
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
    <header className="border-b border-[var(--line)] bg-[var(--surface-soft)]">
      <div className="page-shell py-8 md:py-10">
        <h1 className="display max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-7 text-muted">{intro}</p>
        {children && <div className="mt-5 flex flex-wrap gap-3">{children}</div>}
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
    <div className="max-w-3xl">
      <h2 className="display text-3xl font-bold leading-tight md:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-8 text-muted">{intro}</p>}
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
    <article className="surface flex h-full flex-col p-6">
      <IconComponent
        size={30}
        weight="duotone"
        className="text-[var(--brand)]"
        aria-hidden
      />
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <div className="mt-3 flex-1 leading-7 text-muted">{children}</div>
      {action && (
        <Link className="btn btn-secondary mt-6 self-start" to={action.to}>
          {action.label}
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
    <aside className="surface bg-[var(--surface-soft)] p-6 md:p-9">
      <h2 className="display text-3xl font-bold">{title}</h2>
      <div className="mt-4 max-w-3xl leading-7 text-muted">{children}</div>
      {action && <div className="mt-6 flex flex-wrap gap-3">{action}</div>}
    </aside>
  );
}
