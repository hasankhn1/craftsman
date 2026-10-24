'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { NAV_ITEMS, type NavId } from '@/lib/site';
import { useViewportWidth } from '@/lib/hooks';
import { Crest } from './Media';
import s from './Nav.module.css';

type NavProps = {
  active?: NavId;
  /** Page sits behind a full-bleed hero — widens the bar's outer padding. */
  inHero?: boolean;
  /** Force the scrolled (opaque) treatment from the top of the page. */
  solid?: boolean;
};

const DESKTOP_MIN = 960;

export default function Nav({ active = 'home', inHero = false, solid = false }: NavProps) {
  const width = useViewportWidth();
  const [scrolledY, setScrolledY] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const desktop = width > DESKTOP_MIN;
  const scrolled = scrolledY || solid;

  const setMenu = useCallback((next: boolean, returnFocus: boolean) => {
    setOpen(next);
    window.setTimeout(() => {
      document.body.style.overflow = next ? 'hidden' : '';
      if (next) {
        menuRef.current?.querySelector('a')?.focus();
      } else if (returnFocus) {
        toggleRef.current?.focus();
      }
    }, 30);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolledY(window.scrollY > 24);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false, true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [setMenu]);

  // Collapse the menu when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (desktop && open) setMenu(false, false);
  }, [desktop, open, setMenu]);

  const trap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const menu = menuRef.current;
    if (e.key !== 'Tab' || !menu) return;
    const focusable = [toggleRef.current, ...Array.from(menu.querySelectorAll('a'))].filter(
      Boolean,
    ) as HTMLElement[];
    const i = focusable.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey && i <= 0) {
      e.preventDefault();
      focusable[focusable.length - 1].focus();
    } else if (!e.shiftKey && i === focusable.length - 1) {
      e.preventDefault();
      focusable[0].focus();
    }
  };

  const outerPad = inHero
    ? `${scrolled ? '12px' : desktop ? '26px' : '18px'} calc(clamp(8px,1.2vw,18px) + ${
        desktop ? 'clamp(14px,1.6vw,26px)' : '8px'
      }) 0`
    : `${scrolled ? (desktop ? '12px' : '10px') : desktop ? '22px' : '12px'} clamp(12px,3vw,48px) 0`;

  const style = {
    '--outer-pad': outerPad,
    '--bar-h': desktop ? (scrolled ? '64px' : '72px') : '60px',
    '--bar-pad': desktop ? '0 clamp(20px,2.4vw,34px)' : '0 8px 0 14px',
    '--bar-cols': desktop ? 'minmax(0,1fr) auto minmax(0,1fr)' : 'minmax(0,1fr) auto',
    '--bar-bg':
      scrolled || open
        ? 'linear-gradient(100deg, rgba(22,25,36,.86) 0%, rgba(30,33,44,.84) 55%, rgba(40,43,54,.82) 100%)'
        : 'linear-gradient(100deg, rgba(22,25,36,.55) 0%, rgba(32,35,46,.5) 55%, rgba(44,47,58,.48) 100%)',
    '--bar-border': scrolled ? 'rgba(176,177,198,.34)' : 'rgba(176,177,198,.42)',
    '--bar-shadow': scrolled
      ? '0 10px 34px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.05)'
      : 'inset 0 1px 0 rgba(255,255,255,.06)',
  } as CSSProperties;

  const crestSize = desktop ? (scrolled ? 38 : 42) : 36;
  const mainLinks = NAV_ITEMS.slice(0, 5);

  return (
    <div className={s.wrap} style={style}>
      <header className={s.bar}>
        <Link href="/" aria-label="Blue Phoenix FC — home" className={s.brand}>
          <Crest size={crestSize} />
          {width > 360 && (
            <span className={s.wordmark}>
              <span className={s.wordmarkTop}>BLUE PHOENIX</span>
              <span className={s.wordmarkSub}>FOOTBALL CLUB</span>
            </span>
          )}
        </Link>

        {desktop ? (
          <>
            <nav aria-label="Main" className={s.links}>
              {mainLinks.map((l) => (
                <Link
                  key={l.id}
                  href={l.href}
                  aria-current={l.id === active ? 'page' : undefined}
                  className={`${s.link} ${l.id === active ? s.linkActive : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className={s.actions}>
              <Link href="/fan-club#join" className={s.cta}>
                JOIN THE RISE
              </Link>
            </div>
          </>
        ) : (
          <button
            type="button"
            ref={toggleRef}
            onClick={() => setMenu(!open, true)}
            aria-expanded={open}
            aria-controls="bpfc-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`${s.toggle} ${open ? s.toggleOpen : ''}`}
          >
            <span
              className={s.toggleBar}
              style={{ transform: open ? 'translateY(3.25px) rotate(45deg)' : 'none' }}
            />
            <span
              className={s.toggleBar}
              style={{ transform: open ? 'translateY(-3.25px) rotate(-45deg)' : 'none' }}
            />
          </button>
        )}
      </header>

      {open && (
        <>
          <div className={s.scrim} aria-hidden="true" onClick={() => setMenu(false, false)} />
          <div
            id="bpfc-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            ref={menuRef}
            onKeyDown={trap}
            className={s.menu}
          >
            <nav aria-label="Mobile" className={s.menuNav}>
              {NAV_ITEMS.map((l) => (
                <Link
                  key={l.id}
                  href={l.href}
                  aria-current={l.id === active ? 'page' : undefined}
                  onClick={() => setMenu(false, false)}
                  className={`${s.menuLink} ${l.id === active ? s.menuLinkActive : ''}`}
                >
                  <span>{l.label}</span>
                  <span
                    aria-hidden="true"
                    className={`${s.menuDot} ${l.id === active ? s.menuDotActive : ''}`}
                  />
                </Link>
              ))}
            </nav>
            <Link href="/fan-club#join" onClick={() => setMenu(false, false)} className={s.menuCta}>
              JOIN THE RISE
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
