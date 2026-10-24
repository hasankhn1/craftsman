'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';
import s from '@/app/home.module.css';

const SYLLABLES = ['Deh-', 'Shay', 'Bah-', 'Sah-', 'Rah'];

/** The chant lights up syllable by syllable, then turns "We rise up." blue. */
export default function Chant() {
  const [step, setStep] = useState(-1);
  const reduce = usePrefersReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const call = () => {
    clearTimeout(timer.current);
    if (reduce) {
      setStep(6);
      return;
    }
    const run = (i: number) => {
      setStep(i);
      if (i < 6) timer.current = setTimeout(() => run(i + 1), i < 4 ? 340 : 520);
    };
    run(0);
  };

  const syllables = SYLLABLES.map((text, i) => ({
    text,
    color: step < 0 || step >= i ? 'var(--off-white)' : '#3B4766',
    transform: step === i ? 'translateY(-0.08em)' : 'none',
  }));

  const render = (from: number, to: number) => (
    <span className={s.chantGroup}>
      {syllables.slice(from, to).map((syl, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={s.chantSyllable}
          style={{ color: syl.color, transform: syl.transform }}
        >
          {syl.text}
        </span>
      ))}
    </span>
  );

  return (
    <section aria-labelledby="chant-title" className={s.chant}>
      <div aria-hidden="true" className={s.chantCrest} />
      <h2 id="chant-title" className={s.chantLabel}>
        We chant
      </h2>
      <p lang="ar-Latn" aria-label="Deh-Shay Bah-Sah-Rah" className={s.chantWord}>
        {render(0, 2)}
        {render(2, 5)}
      </p>
      <div className={s.chantFoot}>
        <p
          className={s.chantRise}
          style={{ color: step >= 5 ? 'var(--blue-bright)' : 'var(--off-white)' }}
        >
          We rise up.
        </p>
        <button type="button" onClick={call} className={s.chantBtn}>
          {step >= 0 && step < 6 ? 'RISING…' : 'CALL THE CHANT'}
        </button>
      </div>
    </section>
  );
}
