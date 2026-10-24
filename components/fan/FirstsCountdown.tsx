'use client';

import { useCountdown } from '@/lib/hooks';
import s from '@/app/fan-club/fan.module.css';

const FIRSTS: [string, string, string][] = [
  ['The fan club opens', 'Open now', 'var(--blue-bright)'],
  ['The first player announced', 'To come', 'var(--dim)'],
  ['The first shirt revealed', 'To come', 'var(--dim)'],
  ['The first training session', 'To come', 'var(--dim)'],
  ['The countdown reaches zero', 'Sep 2027 target', 'var(--dim)'],
  ['The first match', 'Date TBC', 'var(--dim)'],
];

export default function FirstsCountdown() {
  const cd = useCountdown();

  return (
    <section aria-labelledby="ms-h" className={s.firsts}>
      <div className={s.firstsGrid}>
        <div style={{ minWidth: 0 }}>
          <h2 id="ms-h" data-reveal="0" className={`display ${s.firstsTitle}`}>
            The firsts you&rsquo;ll witness.
          </h2>
          <p data-reveal="80" className={s.firstsBody}>
            The club-building milestones still to come. Registered fans hear when each one happens.
          </p>
          <p data-reveal="140" className={s.firstsDays}>
            {cd.passed ? '0' : cd.days}
          </p>
          <p className={s.firstsDaysNote}>
            days to the September 2027 season-launch target
          </p>
        </div>

        <ul className={s.firstsList}>
          {FIRSTS.map(([title, state, colour], i) => (
            <li key={title} data-reveal={50 * i} className={s.firstRow}>
              <span className={s.firstName}>{title}</span>
              <span className={s.firstState} style={{ color: colour }}>
                {state}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
