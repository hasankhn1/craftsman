'use client';

import type { CSSProperties } from 'react';
import { useCountdown, useRoadProgress } from '@/lib/hooks';
import { CONFIG } from '@/lib/site';
import s from '@/app/home.module.css';

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

export default function RoadToKickoff() {
  const cd = useCountdown();
  const road = useRoadProgress();

  const values = [cd.days, cd.hours, cd.minutes, cd.seconds];
  const note = CONFIG.kickoffConfirmed
    ? 'Counting down to the official first match.'
    : 'Season-launch countdown to 1 September 2027. The official first-match date will be confirmed by the club.';

  return (
    <section id="road" aria-labelledby="road-title" className={s.road}>
      <div className={s.roadHead}>
        <h2 id="road-title" data-reveal="0" className={`display ${s.roadTitle}`}>
          The road to kick-off
        </h2>
        <div data-reveal="80" className={s.roadAside}>
          <p className={s.roadAsideLead}>
            September 2027.
            <br />
            Season 2027/2028.
          </p>
          <p className={s.roadAsideNote}>{note}</p>
        </div>
      </div>

      {cd.passed ? (
        <p className={s.seasonHere}>The season is here.</p>
      ) : (
        <div
          role="timer"
          aria-live="off"
          aria-label={`${cd.days} days, ${cd.hours} hours, ${cd.minutes} minutes until the season-launch target`}
          className={s.clock}
        >
          {UNITS.map((unit, i) => (
            <div key={unit} className={s.clockCell}>
              <div className={`${s.clockNum} ${i === 3 ? s.clockNumAccent : ''}`}>{values[i]}</div>
              <div className={s.clockLabel}>{unit}</div>
            </div>
          ))}
        </div>
      )}

      <div className={s.progress}>
        <div
          className={s.progressTrack}
          style={{ '--pct': road?.pctLabel ?? '0%' } as CSSProperties}
        >
          <div className={s.progressFill} />
          <div className={s.progressKnob} />
        </div>
        <div className={s.progressLegend}>
          <span>
            <strong>15 Sep 2026</strong>
            <br />
            The journey begins
          </span>
          <span style={{ textAlign: 'center' }}>
            <strong>You are here</strong>
            <br />
            Day {road?.daysIn ?? '—'} of the road
          </span>
          <span style={{ textAlign: 'right' }}>
            <strong>Sep 2027</strong>
            <br />
            Season launch target
          </span>
        </div>
      </div>
    </section>
  );
}
