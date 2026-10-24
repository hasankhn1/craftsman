'use client';

import type { CSSProperties } from 'react';
import { FillImage } from '@/components/Media';
import { useRail } from '@/lib/hooks';
import { TEAM } from '@/lib/site';
import s from '@/app/team/team.module.css';

export default function FoundersRail() {
  const rail = useRail(TEAM.length);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Founders and directors">
      <div
        ref={rail.ref}
        tabIndex={0}
        aria-label="Profiles — use arrow keys to browse"
        onScroll={rail.onScroll}
        onKeyDown={rail.onKeyDown}
        onPointerDown={rail.onPointerDown}
        onPointerMove={rail.onPointerMove}
        onPointerUp={rail.onPointerUp}
        onPointerLeave={rail.onPointerUp}
        className={`rail ${s.rail}`}
        style={{ cursor: rail.cursor, margin: '0 calc(-1 * var(--gutter))' }}
      >
        {TEAM.map((person, i) => (
          <article
            key={person.name}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${TEAM.length}: ${person.name}, ${person.role}`}
            className={s.card}
            style={
              {
                '--card-border':
                  i === rail.index ? 'rgba(111,177,255,.35)' : 'rgba(255,255,255,.08)',
              } as CSSProperties
            }
          >
            <div className={s.portrait}>
              <div className={s.portraitInner}>
                <FillImage
                  src={person.img}
                  alt={`Portrait of ${person.name}`}
                  sizes="(max-width: 760px) 78vw, 340px"
                />
              </div>
              <span aria-hidden="true" className={s.portraitFade} />
              <span className={s.badge}>{i < 3 ? 'Co-founder' : 'Director'}</span>
            </div>

            <div className={s.cardBody}>
              <div style={{ minWidth: 0 }}>
                <h3 className={s.cardName}>{person.name}</h3>
                <p className={s.cardRole}>{person.role}</p>
              </div>
              <div className={s.socials}>
                <a
                  href={person.li}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${person.name} on LinkedIn`}
                  className={s.social}
                >
                  in
                </a>
                <a
                  href={person.ig}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${person.name} on Instagram`}
                  className={s.social}
                >
                  IG
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={s.railFoot}>
        <div className={s.railMeta}>
          <span aria-live="polite" className="railCount">
            {rail.count}
          </span>
          <div className={s.dots}>
            {TEAM.map((person, i) => (
              <button
                key={person.name}
                type="button"
                aria-label={`Go to profile ${i + 1}`}
                aria-current={i === rail.index ? 'true' : undefined}
                onClick={() => rail.go(i)}
                className="dotBtn"
                style={{ width: 30, height: 30 }}
              >
                <span
                  className="dotBar"
                  style={{
                    width: i === rail.index ? 26 : 10,
                    background: i === rail.index ? 'var(--blue)' : 'var(--line-strong)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="railNav">
          <button
            type="button"
            onClick={rail.prev}
            disabled={rail.atStart}
            aria-label="Previous profile"
            className="railBtn railBtnLight"
            style={{ opacity: rail.atStart ? 0.4 : 1 }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={rail.next}
            disabled={rail.atEnd}
            aria-label="Next profile"
            className="railBtn railBtnDark"
            style={{ opacity: rail.atEnd ? 0.4 : 1 }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
