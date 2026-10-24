'use client';

import { useEffect } from 'react';

const BG: Record<string, string> = {
  navy: '#10182D',
  white: '#FFFFFF',
  paper: '#F7F8FC',
};

/**
 * Mirrors the page theme onto <body> so the overscroll area and the browser
 * theme colour match the page. Purely cosmetic — the visible page background
 * is already server-rendered by the Page wrapper.
 */
export default function BodyTheme({ theme }: { theme: string }) {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = BG[theme] ?? BG.navy;
    document.body.dataset.theme = theme;
    return () => {
      document.body.style.background = prev;
      delete document.body.dataset.theme;
    };
  }, [theme]);

  return null;
}
