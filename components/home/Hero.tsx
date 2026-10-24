'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { FillImage } from '@/components/Media';
import { useCountdown } from '@/lib/hooks';
import { IMG, MEDIA } from '@/lib/site';
import s from '@/app/home.module.css';

export default function Hero() {
  const cd = useCountdown();

  // Autoplay needs the muted attribute present before play() on iOS Safari.
  const videoRef = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute('muted', '');
    el.setAttribute('playsinline', '');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.removeAttribute('autoplay');
      el.pause();
      return;
    }
    el.play().catch(() => {
      /* blocked by the browser — the still image stays visible */
    });
  }, []);

  return (
    <section aria-labelledby="hero-title" className={s.hero}>
      <div aria-hidden="true" className={s.heroBg} />
      <div aria-hidden="true" className={s.heroVignette} />

      <div className={s.heroPanel}>
        <div aria-hidden="true" className={s.heroGlass} />

        <div className={s.heroMedia}>
          <FillImage
            src={IMG.ground}
            alt="Blue Phoenix FC — stadium backdrop"
            sizes="100vw"
            priority
          />
          <video
            ref={videoRef}
            src={MEDIA.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
            onPlaying={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            className={s.heroVideo}
          />
        </div>

        <div aria-hidden="true" className={s.heroScrim} />

        <div className={s.heroContent}>
          <div className={s.heroRow}>
            <div className={s.heroCopy}>
              <h1 id="hero-title" className={s.heroTitle}>
                <span className={s.heroTitleMask}>
                  <span className={s.heroTitleLine} style={{ '--delay': '1.4s' } as React.CSSProperties}>
                    The rise
                  </span>
                </span>
                <span className={s.heroTitleMask}>
                  <span className={s.heroTitleLine} style={{ '--delay': '1.52s' } as React.CSSProperties}>
                    starts here.
                  </span>
                </span>
              </h1>

              <p className={s.heroTagline}>Be a Blue. Be a Phoenix. Together We Rise Up.</p>

              <div className={s.heroActions}>
                <Link href="/fan-club#join" className={`${s.heroBtn} ${s.heroBtnSolid}`}>
                  JOIN THE RISE
                </Link>
                <Link href="/our-journey" className={`${s.heroBtn} ${s.heroBtnGlass}`}>
                  DISCOVER OUR JOURNEY
                </Link>
              </div>
            </div>

            <a href="#road" className={s.heroCard}>
              <span className={s.heroCardHead}>
                <span style={{ whiteSpace: 'nowrap' }}>Road to kick-off</span>
                <span className={s.heroCardTag}>Sep 2027</span>
              </span>
              <span className={s.heroCardFigure}>
                <span className={s.heroCardNum}>{cd.days}</span>
                <span className={s.heroCardUnit}>days to the season-launch target</span>
              </span>
              <span className={s.heroCardLink}>See the countdown ↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
