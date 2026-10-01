import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./PageIntro.module.css";

interface Crumb {
  label: string;
  href?: string;
}

interface PageIntroProps {
  breadcrumbs: Crumb[];
  children: ReactNode;
}

/** Top band for inner pages (doctor / specialty profiles): breadcrumbs + content. */
export function PageIntro({ breadcrumbs, children }: PageIntroProps) {
  return (
    <section className={styles.intro}>
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className={styles.breadcrumbs}>
            {breadcrumbs.map((crumb, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={crumb.label}>
                  {crumb.href && !last ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined}>{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        {children}
      </div>
    </section>
  );
}
