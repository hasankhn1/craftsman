'use client';

import { useCountdown, useRoadProgress } from '@/lib/hooks';
import s from '@/app/our-journey/journey.module.css';

const DONE = { dot: '#1554B8', ring: '#1554B8', when: '#168BFF' };
const NOW = { dot: '#EFEFF3', ring: '#EFEFF3', when: '#EFEFF3' };
const NEXT = { dot: '#10182D', ring: '#2A3756', when: '#B0B1C6' };

export default function JourneyRoad() {
  const cd = useCountdown();
  const road = useRoadProgress();

  const milestones = [
    {
      ...DONE,
      whenLabel: '15 September 2026',
      title: 'The journey begins',
      text: 'The club’s story is published and the first chapter of BPFC Journey goes live.',
    },
    {
      ...DONE,
      whenLabel: 'September 2026',
      title: 'The fan club opens',
      text: 'Supporters can register before a ball is kicked.',
    },
    {
      ...NOW,
      whenLabel: road ? `Now · ${road.today}` : 'Now',
      title: 'Building the foundations',
      text: 'Players and coaching, operations, commercial, media, technology and fan engagement.',
    },
    {
      ...NEXT,
      whenLabel: 'Still to come',
      title: 'The first player announced',
      text: 'Squad announcements will be made by the club when confirmed.',
    },
    { ...NEXT, whenLabel: 'Still to come', title: 'The first shirt revealed', text: '' },
    { ...NEXT, whenLabel: 'Still to come', title: 'The first training session', text: '' },
    {
      ...NEXT,
      whenLabel: 'Target · September 2027',
      title: 'Season 2027/28 launch',
      text: 'The objective: compete in the UAE Third Division. Official first-match date to be confirmed.',
    },
  ];

  return (
    <section
      data-chapter="The road to September 2027"
      aria-labelledby="c8"
      className={s.road}
    >
      <div className={s.roadGrid}>
        <div className={s.roadSticky}>
          <h2 id="c8" data-reveal="0" className={`display ${s.roadTitle}`}>
            The road to September 2027.
          </h2>
          <p data-reveal="80" className={s.roadDays}>
            {cd.passed ? 'Here.' : `${cd.days} days`}
          </p>
          <p data-reveal="80" className={s.roadNote}>
            {cd.passed
              ? 'The season-launch target has arrived.'
              : 'Until the season-launch target, 1 September 2027.'}
          </p>
        </div>

        <ol aria-label="Road to kick-off timeline" className={s.timeline}>
          <span aria-hidden="true" className={s.timelineRule} />
          {milestones.map((m, i) => (
            <li key={m.title} data-reveal={50 * i} className={s.timelineItem}>
              <span
                aria-hidden="true"
                className={s.timelineDot}
                style={{ background: m.dot, borderColor: m.ring }}
              />
              <p className={s.timelineWhen} style={{ color: m.when }}>
                {m.whenLabel}
              </p>
              <p className={s.timelineTitle}>{m.title}</p>
              {m.text && <p className={s.timelineText}>{m.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
