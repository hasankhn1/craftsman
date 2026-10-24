'use client';

import { useEffect, useState } from 'react';
import s from '@/app/our-journey/journey.module.css';

/**
 * Fixed reading-progress bar plus the current-chapter pill, driven by the
 * `data-chapter` attribute on each section.
 */
export default function JourneyProgress() {
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState('Our journey');
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);

      let current = 'Our journey';
      document.querySelectorAll<HTMLElement>('[data-chapter]').forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.5) {
          current = section.getAttribute('data-chapter') ?? current;
        }
      });
      setChapter(current);
    };
    const onResize = () => {
      setWide(window.innerWidth > 760);
      onScroll();
    };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const showChapter = progress > 0.04 && progress < 0.97 && wide;

  return (
    <>
      <div aria-hidden="true" className={s.progressBar}>
        <div className={s.progressFill} style={{ transform: `scaleX(${progress})` }} />
      </div>
      {showChapter && (
        <div aria-hidden="true" className={s.chapter}>
          <span className={s.chapterDot} />
          {chapter}
        </div>
      )}
    </>
  );
}
