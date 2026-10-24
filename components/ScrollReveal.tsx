'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll reveals for [data-reveal]. Mounted once in the root layout.
 *
 * Mirrors the original site.js behaviour: elements already on screen are never
 * hidden, and if the observer can't run the content simply stays visible.
 * The `data-reveal` value is the stagger delay in milliseconds.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = Number(el.getAttribute('data-reveal') || 0);
          el.style.transition =
            `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, ` +
            `transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`;
          el.removeAttribute('data-rv-hidden');
          el.style.opacity = '1';
          el.style.transform = 'none';
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-rv])').forEach((el) => {
        el.setAttribute('data-rv', '1');
        // Already on screen: never hide it.
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
        el.setAttribute('data-rv-hidden', '1');
        io.observe(el);
      });
    };

    const mo = new MutationObserver(scan);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    scan();

    return () => {
      mo.disconnect();
      io.disconnect();
      // Leave the page clean for the next route.
      document.querySelectorAll<HTMLElement>('[data-rv]').forEach((el) => {
        el.removeAttribute('data-rv');
        el.removeAttribute('data-rv-hidden');
      });
    };
  }, [pathname]);

  return null;
}
