import type { Metadata } from 'next';
import Page from '@/components/Page';
import { FillImage } from '@/components/Media';
import TopicsRail from '@/components/fan/TopicsRail';
import FirstsCountdown from '@/components/fan/FirstsCountdown';
import JoinForm from '@/components/fan/JoinForm';
import { IMG } from '@/lib/site';
import s from './fan.module.css';

export const metadata: Metadata = {
  title: 'Be a Fan',
  description:
    "You don't have to wait for the first match to become part of the club. Join the Blue Phoenix FC fan club before the 2027/28 season.",
  alternates: { canonical: '/fan-club' },
  openGraph: {
    title: 'Claim your place in the rise — Blue Phoenix FC',
    description: 'Join the founding community of Blue Phoenix FC.',
    images: [IMG.fans],
  },
};

export default function FanClubPage() {
  return (
    <Page theme="navy" active="fan">
      {/* Hero ----------------------------------------------------------- */}
      <section aria-labelledby="fan-h" className={s.hero}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <FillImage src={IMG.fans} alt="Blue Phoenix FC supporters" sizes="100vw" priority />
        </div>
        <div aria-hidden="true" className={s.heroScrim} />
        <div className={s.heroInner}>
          <h1 id="fan-h" className={`display ${s.heroTitle}`}>
            Join before the first whistle.
          </h1>
          <p className={s.heroBody}>
            You don&rsquo;t have to wait for the first match to become part of the club.
          </p>
          <div className={s.heroActions}>
            <a href="#join" className="btn btnPrimary">
              CLAIM YOUR PLACE IN THE RISE
            </a>
          </div>
        </div>
      </section>

      {/* You're on time --------------------------------------------------- */}
      <section aria-labelledby="why-h" className={s.why}>
        <div className={s.whyGrid}>
          <h2 id="why-h" data-reveal="0" className={`display ${s.whyTitle}`}>
            You&rsquo;re not early. You&rsquo;re on time.
          </h2>
          <div style={{ minWidth: 0 }}>
            <p data-reveal="80" className={s.whyLead}>
              Most clubs meet their supporters on matchday. The people who join Blue Phoenix now
              won&rsquo;t inherit a history — they&rsquo;ll help create it.
            </p>
            <p data-reveal="140" className={s.whyBody}>
              They&rsquo;ll remember when the first player was announced, when the first shirt was
              revealed and when the countdown finally reached zero. A club without its people is only
              a badge.
            </p>
          </div>
        </div>
      </section>

      {/* What you'll hear about -------------------------------------------- */}
      <section aria-labelledby="expect-h" className={s.expect}>
        <div className={s.expectHead}>
          <h2 id="expect-h" data-reveal="0" className={`display ${s.expectTitle}`}>
            What you&rsquo;ll hear about
          </h2>
          <p data-reveal="80" className={s.expectNote}>
            What the club has said it will share with registered fans. No paid membership, no
            promises of perks.
          </p>
        </div>
        <TopicsRail />
      </section>

      <FirstsCountdown />
      <JoinForm />
    </Page>
  );
}
