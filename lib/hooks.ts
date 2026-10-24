'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { countdown, roadProgress, type Countdown, type RoadProgress } from './site';

/** True once the component has mounted on the client. Use to gate anything
 *  time- or viewport-dependent so SSR and first hydration agree. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

const PLACEHOLDER: Countdown = {
  passed: false,
  days: '—',
  hours: '—',
  minutes: '—',
  seconds: '—',
};

/** Live countdown to the season-launch target. Renders em-dashes on the server
 *  and the real figures from the first client tick. */
export function useCountdown(): Countdown {
  const [cd, setCd] = useState<Countdown>(PLACEHOLDER);
  useEffect(() => {
    const tick = () => setCd(countdown());
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);
  return cd;
}

/** Road-to-kick-off progress. Null until mounted (it depends on "now"). */
export function useRoadProgress(): RoadProgress | null {
  const [road, setRoad] = useState<RoadProgress | null>(null);
  useEffect(() => {
    const tick = () => setRoad(roadProgress());
    tick();
    const iv = setInterval(tick, 60_000);
    return () => clearInterval(iv);
  }, []);
  return road;
}

/** Viewport width, seeded at the desktop breakpoint so the server and the first
 *  client render agree; corrected on mount. */
export function useViewportWidth(initial = 1440): number {
  const [w, setW] = useState(initial);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}

/* ------------------------------------------------------------------
   useRail — horizontal scroll-snap rail with dots, arrows, keyboard
   and mouse-drag panning. Shared by Team and Fan Club.
   ------------------------------------------------------------------ */

export type Rail = {
  ref: (el: HTMLDivElement | null) => void;
  index: number;
  atStart: boolean;
  atEnd: boolean;
  cursor: 'grab' | 'grabbing';
  count: string;
  go: (i: number) => void;
  prev: () => void;
  next: () => void;
  onScroll: () => void;
  onKeyDown: (e: ReactKeyboardEvent<HTMLDivElement>) => void;
  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
};

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export function useRail(count: number): Rail {
  const elRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ x: number; s: number; moved: boolean } | null>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduce = usePrefersReducedMotion();

  const step = useCallback(() => {
    const el = elRef.current;
    const card = el?.querySelector('article');
    if (!el || !card) return 320;
    const gap = parseFloat(getComputedStyle(el).columnGap || '16') || 16;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const go = useCallback(
    (i: number) => {
      const el = elRef.current;
      if (!el) return;
      const cards = el.querySelectorAll<HTMLElement>('article');
      const card = cards[Math.max(0, Math.min(count - 1, i))];
      const first = el.firstElementChild as HTMLElement | null;
      if (!card || !first) return;
      el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
    },
    [count, reduce],
  );

  const onScroll = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const start = el.scrollLeft < 4;
    const i = end ? count - 1 : Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / step())));
    setIndex(i);
    setAtEnd(end);
    setAtStart(start);
  }, [count, step]);

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(index - 1);
      }
    },
    [go, index],
  );

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const el = elRef.current;
    if (e.pointerType !== 'mouse' || !el) return;
    if ((e.target as HTMLElement).closest('a,button')) return;
    dragRef.current = { x: e.clientX, s: el.scrollLeft, moved: false };
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = elRef.current;
      const d = dragRef.current;
      if (!d || !el) return;
      const dx = e.clientX - d.x;
      if (Math.abs(dx) > 5) {
        d.moved = true;
        el.style.scrollSnapType = 'none';
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = d.s - dx;
        setDragging(true);
      }
    },
    [],
  );

  const onPointerUp = useCallback(() => {
    const el = elRef.current;
    const d = dragRef.current;
    if (!d || !el) return;
    dragRef.current = null;
    el.style.scrollSnapType = '';
    el.style.scrollBehavior = '';
    if (d.moved) {
      setDragging(false);
      go(Math.round(el.scrollLeft / step()));
    }
  }, [go, step]);

  const ref = useCallback((el: HTMLDivElement | null) => {
    elRef.current = el;
  }, []);

  return {
    ref,
    index,
    atStart,
    atEnd,
    cursor: dragging ? 'grabbing' : 'grab',
    count: `${pad2(index + 1)} / ${pad2(count)}`,
    go,
    prev: () => go(index - 1),
    next: () => go(index + 1),
    onScroll,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
