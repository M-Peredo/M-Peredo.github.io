import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

type Props = {
  href: string;
  variant?: "primary" | "secondary" | "text";
  icon?: "arrow" | "external" | "none";
  external?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({ href, variant = "primary", icon = "none", external = false, children, className = "" }: Props) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const Icon = icon === "arrow" ? ArrowRight : icon === "external" ? ArrowUpRight : null;
  const inner = (
    <>
      {children}
      {Icon && <Icon className="btn-icon" />}
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a className={cls} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}
