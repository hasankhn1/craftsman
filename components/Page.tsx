import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import BodyTheme from './BodyTheme';
import type { NavId } from '@/lib/site';

export type Theme = 'navy' | 'white' | 'paper';

type PageProps = {
  theme: Theme;
  active?: NavId;
  inHero?: boolean;
  solid?: boolean;
  /** Render the skip link (home page only, matching the source). */
  skipLink?: boolean;
  children: ReactNode;
};

/**
 * Page shell: theme wrapper + nav + main + footer. `theme` reproduces the
 * per-page `body { background; color }` block from each .dc.html source.
 */
export default function Page({
  theme,
  active = 'none',
  inHero = false,
  solid = false,
  skipLink = false,
  children,
}: PageProps) {
  return (
    <div data-theme={theme}>
      <BodyTheme theme={theme} />
      {skipLink && (
        <a href="#main" className="skipLink">
          Skip to content
        </a>
      )}
      <Nav active={active} inHero={inHero} solid={solid} />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
