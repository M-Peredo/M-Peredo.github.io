import Link from "next/link";

const LINKS = [
  { href: "/#work", label: "Work", key: "work" },
  { href: "/#about", label: "About", key: "about" },
  { href: "/#contact", label: "Contact", key: "contact" },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="wordmark">Molly Peredo</Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.key} href={l.href} {...(current === l.key ? { "aria-current": "page" as const } : {})}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
