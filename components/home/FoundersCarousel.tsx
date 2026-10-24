'use client';

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { FillImage } from '@/components/Media';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { TEAM } from '@/lib/site';
import s from '@/app/home.module.css';

const AUTOPLAY_MS = 4600;
const HOLD_AFTER_INTERACTION_MS = 9000;
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function FoundersCarousel() {
  const n = TEAM.length;
  const reduce = usePrefersReducedMotion();

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(1200);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const [announce, setAnnounce] = useState(false);

  const holdUntil = useRef(0);
  const visible = useRef(true);
  const viewport = useRef<HTMLDivElement | null>(null);
  const pointer = useRef<{ x: number; y: number; moved: boolean; tracking: boolean } | null>(null);

  const go = useCallback(
    (i: number, user: boolean) => {
      setIndex(((i % n) + n) % n);
      if (user) {
        holdUntil.current = Date.now() + HOLD_AFTER_INTERACTION_MS;
        setAnnounce(true);
      }
    },
    [n],
  );

  // Measure the viewport and track whether it is on screen.
  const viewportRef = useCallback((el: HTMLDivElement | null) => {
    viewport.current = el;
    if (!el) return;
    setWidth(el.clientWidth);
  }, []);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const io = new IntersectionObserver(
      (entries) => {
        visible.current = entries[0].isIntersecting;
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Autoplay, paused on hover, drag, recent interaction, hidden tab or offscreen.
  useEffect(() => {
    if (reduce) return;
    const iv = setInterval(() => {
      if (hover || dragging || Date.now() < holdUntil.current) return;
      if (document.hidden || !visible.current) return;
      setIndex((i) => (i + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearInterval(iv);
  }, [reduce, hover, dragging, n]);

  const cardW = Math.round(
    width >= 1100 ? Math.min(420, width * 0.3) : width >= 700 ? Math.min(400, width * 0.46) : width * 0.78,
  );
  const gap = width >= 700 ? 28 : 14;
  const tx = Math.round(width / 2 - (index * (cardW + gap) + cardW / 2) + drag);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointer.current = { x: e.clientX, y: e.clientY, moved: false, tracking: true };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (!p?.tracking) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (!dragging) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        setDragging(true);
        e.currentTarget.setPointerCapture?.(e.pointerId);
      } else if (Math.abs(dy) > 10) {
        p.tracking = false;
      }
      return;
    }
    p.moved = true;
    setDrag(dx);
  };

  const onPointerUp = () => {
    const p = pointer.current;
    if (!p?.tracking && !dragging) return;
    if (p) p.tracking = false;
    if (!dragging) return;
    const threshold = Math.min(90, width * 0.12);
    setDragging(false);
    setDrag(0);
    if (drag < -threshold) go(index + 1, true);
    else if (drag > threshold) go(index - 1, true);
  };

  return (
    <section aria-labelledby="team-title" className={s.founders}>
      <div className={s.foundersHead}>
        <h2 id="team-title" data-reveal="0" className={`display ${s.foundersTitle}`}>
          The founding team
        </h2>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Founding team"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            go(index + 1, true);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            go(index - 1, true);
          }
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className={s.carousel}
      >
        <div
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          className={s.carouselViewport}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        >
          <div
            aria-live={announce ? 'polite' : 'off'}
            className={s.carouselTrack}
            style={{
              gap: `${gap}px`,
              transform: `translate3d(${tx}px,0,0)`,
              transition: dragging || reduce ? 'none' : 'transform .85s cubic-bezier(.22,.8,.2,1)',
            }}
          >
            {TEAM.map((person, i) => {
              const on = i === index;
              const distance = Math.abs(i - index);
              return (
                <article
                  key={person.name}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${n}: ${person.name}, ${person.role}`}
                  aria-current={on ? 'true' : undefined}
                  onClick={() => {
                    if (pointer.current?.moved) return;
                    if (!on) go(i, true);
                  }}
                  className={s.slide}
                  style={
                    {
                      '--w': `${cardW}px`,
                      transform: `scale(${on ? 1 : 0.86})`,
                      opacity: on ? 1 : distance === 1 ? 0.62 : 0.35,
                      cursor: on ? 'inherit' : 'pointer',
                    } as CSSProperties
                  }
                >
                  <div
                    className={s.slideFrame}
                    style={{ boxShadow: on ? '0 24px 60px rgba(16,24,45,.16)' : 'none' }}
                  >
                    <FillImage
                      src={person.img}
                      alt={`${person.name} — ${person.role}`}
                      sizes="(max-width: 700px) 78vw, 420px"
                    />
                    <span className={s.slideNum}>{pad2(i + 1)}</span>
                  </div>
                  <div
                    className={s.slideText}
                    style={{ opacity: on ? 1 : 0.7, transform: `translateY(${on ? '0' : '6px'})` }}
                  >
                    <h3 className={s.slideName}>{person.name}</h3>
                    <p className={s.slideRole}>{person.role}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className={s.carouselFoot}>
          <div className={s.carouselMeta}>
            <span aria-hidden="true" className="railCount">
              {pad2(index + 1)} / {pad2(n)}
            </span>
            <div role="tablist" aria-label="Choose a team member" className={s.dots}>
              {TEAM.map((person, i) => (
                <button
                  key={person.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${person.name}`}
                  onClick={() => go(i, true)}
                  className="dotBtn"
                  style={{ width: 32, height: 32 }}
                >
                  <span
                    className="dotBar"
                    style={{
                      width: i === index ? 28 : 10,
                      background: i === index ? 'var(--blue)' : 'var(--line-strong)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="railNav">
            <button
              type="button"
              onClick={() => go(index - 1, true)}
              aria-label="Previous team member"
              className="railBtn railBtnLight"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1, true)}
              aria-label="Next team member"
              className="railBtn railBtnDark"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <Link href="/team" className="linkRule" style={{ marginTop: 48 }}>
        Meet the team →
      </Link>
    </section>
  );
}
