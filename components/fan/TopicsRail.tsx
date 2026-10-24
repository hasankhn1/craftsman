'use client';

import type { CSSProperties } from 'react';
import { useRail } from '@/lib/hooks';
import s from '@/app/fan-club/fan.module.css';

const TOPICS = [
  {
    tag: 'Club news',
    title: 'Club announcements',
    text: 'Official news first — from squad announcements to the season launch.',
  },
  {
    tag: 'Inside the build',
    title: 'Behind the scenes',
    text: 'How the club is being built: planning, preparation and the people doing the work.',
  },
  {
    tag: 'Milestones',
    title: 'Club-building milestones',
    text: 'Each first as it happens — the first player, the first shirt, the first session.',
  },
  {
    tag: 'Season',
    title: 'News & season updates',
    text: 'The road to the 2027/28 season, and match news once fixtures are confirmed.',
  },
  {
    tag: 'Get involved',
    title: 'Ways to take part',
    text: 'Opportunities to participate — the club plans digital experiences, grassroots and youth initiatives.',
  },
  {
    tag: 'The journey',
    title: 'The story, from chapter one',
    text: 'BPFC Journey stories as they’re published.',
  },
];

export default function TopicsRail() {
  const rail = useRail(TOPICS.length);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="What you'll hear about"
      className={s.carousel}
    >
      <div
        ref={rail.ref}
        tabIndex={0}
        aria-label="Topics — use arrow keys to browse"
        onScroll={rail.onScroll}
        onKeyDown={rail.onKeyDown}
        onPointerDown={rail.onPointerDown}
        onPointerMove={rail.onPointerMove}
        onPointerUp={rail.onPointerUp}
        onPointerLeave={rail.onPointerUp}
        className={`rail ${s.rail}`}
        style={{ cursor: rail.cursor, margin: '0 calc(-1 * var(--gutter))' }}
      >
        {TOPICS.map((topic, i) => (
          <article
            key={topic.title}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${TOPICS.length}: ${topic.title}`}
            className={s.topic}
            style={
              {
                '--topic-border':
                  i === rail.index ? 'rgba(111,177,255,.35)' : 'rgba(255,255,255,.1)',
              } as CSSProperties
            }
          >
            <span aria-hidden="true" className={s.topicGlow} />
            <p className={s.topicMeta}>
              <span className={s.topicNum}>0{i + 1}</span>
              <span aria-hidden="true" className={s.topicSlash}>
                /
              </span>
              <span>{topic.tag}</span>
            </p>
            <h3 className={s.topicTitle}>{topic.title}</h3>
            <p className={s.topicText}>{topic.text}</p>
            <span aria-hidden="true" className={s.topicRule} />
          </article>
        ))}
      </div>

      <div className={s.railFoot}>
        <div className={s.railMeta}>
          <span aria-live="polite" className="railCount">
            {rail.count}
          </span>
          <div className={s.dots}>
            {TOPICS.map((topic, i) => (
              <button
                key={topic.title}
                type="button"
                aria-label={`Go to topic ${i + 1}`}
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
            aria-label="Previous topic"
            className="railBtn railBtnLight"
            style={{ opacity: rail.atStart ? 0.4 : 1 }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={rail.next}
            disabled={rail.atEnd}
            aria-label="Next topic"
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
