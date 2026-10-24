import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import Page from '@/components/Page';
import { FillImage } from '@/components/Media';
import Hero from '@/components/home/Hero';
import RoadToKickoff from '@/components/home/RoadToKickoff';
import FoundersCarousel from '@/components/home/FoundersCarousel';
import Chant from '@/components/home/Chant';
import { getFeatured, IMG, MEDIA, NEWS } from '@/lib/site';
import s from './home.module.css';

export const metadata: Metadata = {
  title: {
    absolute: 'Blue Phoenix FC — Be a Blue. Be a Phoenix. Together We Rise Up.',
  },
  description:
    'Blue Phoenix FC is a new football club being built from the ground up in the UAE, working towards the UAE Third Division for the 2027/28 season. Join the journey before the first whistle.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Blue Phoenix FC — Witness the Rise',
    description:
      'A new football club being built from the ground up in the UAE. Season launch target: September 2027.',
  },
};

const FIRSTS = [
  'The first player to wear the shirt',
  'The first training session',
  'The first match',
  'The first goal',
  'The first victory',
];

export default function HomePage() {
  const feature = getFeatured();
  const rest = NEWS.filter((n) => n.slug !== feature.slug);

  return (
    <Page theme="navy" active="home" inHero skipLink>
      <Hero />
      <RoadToKickoff />

      {/* Built before the first whistle ------------------------------- */}
      <section
        aria-labelledby="begin-title"
        className={s.whistle}
        style={
          {
            '--whistle-img': `url('${MEDIA.firstWhistle.src}'), url('${MEDIA.firstWhistle.fallback}')`,
          } as CSSProperties
        }
      >
        <div className={s.whistleInner}>
          <h2 id="begin-title" data-reveal="0" className={s.whistleTitle}>
            <span>Built before the</span>
            <span className={s.whistleAccent}>first whistle.</span>
          </h2>
          <p data-reveal="80" className={s.whistleBody}>
            Clubs aren&rsquo;t built on matchday. They&rsquo;re built through the decisions, people,
            and preparation that happen long before kickoff.
          </p>
          <p data-reveal="150" className={s.whistleKicker}>
            <b>We&rsquo;re building more than a team.</b> <em>We&rsquo;re building a future.</em>
          </p>
        </div>
      </section>

      {/* The history is waiting to be written -------------------------- */}
      <section aria-label="The firsts still to come" className={s.firsts}>
        <div className={s.firstsGrid}>
          <div style={{ minWidth: 0 }}>
            <h2 data-reveal="0" className={`display ${s.firstsTitle}`}>
              The history is waiting to be written.
            </h2>
            <p data-reveal="80" className={s.firstsIntro}>
              No trophies to celebrate yet. No great nights in the record. That is precisely the
              point — every first belongs to the people here from the beginning.
            </p>
          </div>
          <ul aria-label="The firsts still to come" className={s.firstsList}>
            {FIRSTS.map((label, i) => (
              <li key={label} data-reveal={60 * i} className={s.firstRow}>
                <span className={s.firstLabel}>{label}</span>
                <span className={s.firstMeta}>Not yet written</span>
              </li>
            ))}
            <li data-reveal="420" style={{ listStyle: 'none' }}>
              <Link href="/fan-club#join" className={s.firstRowOpen}>
                <span className={s.firstLabel}>The first supporters</span>
                <span className={s.firstMeta}>Open now →</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Vision -------------------------------------------------------- */}
      <section aria-labelledby="vision-title" className={`${s.statement} ${s.statementPaper}`}>
        <div className={s.statementInner}>
          <p data-reveal="0" className={s.eyebrow}>
            <span className={s.eyebrowNum}>01</span>
            <span aria-hidden="true" className={s.eyebrowRule} />
            <span className={s.eyebrowLabel}>Where we are going</span>
          </p>
          <h2 id="vision-title" data-reveal="60" className={`display ${s.statementTitle}`}>
            Our vision
          </h2>
          <span aria-hidden="true" data-reveal="100" className={s.statementRule} />
          <p data-reveal="0" className={s.statementLead}>
            To build Blue Phoenix FC into a leading football club from the UAE, rising from the
            ground up through ambition, talent, innovation and an unwavering connection with our
            fans.
          </p>
          <p data-reveal="80" className={s.statementBody} style={{ maxWidth: '36em' }}>
            We aim to create a club that develops players, inspires communities and embraces the
            future of sport, while building a distinctive identity that can grow from the UAE to the
            world.
          </p>
          <p data-reveal="140" className={s.statementQuote}>
            We are not simply building a team for today — we are building a football institution for
            generations to come.
          </p>
        </div>
      </section>

      {/* Mission ------------------------------------------------------- */}
      <section aria-labelledby="mission-title" className={`${s.statement} ${s.statementWhite}`}>
        <div className={s.statementInner}>
          <p data-reveal="0" className={s.eyebrow}>
            <span className={s.eyebrowNum}>02</span>
            <span aria-hidden="true" className={s.eyebrowRule} />
            <span className={s.eyebrowLabel}>How we get there</span>
          </p>
          <h2 id="mission-title" data-reveal="60" className={`display ${s.statementTitle}`}>
            Our mission
          </h2>
          <span aria-hidden="true" data-reveal="100" className={s.statementRule} />
          <p data-reveal="0" className={s.statementLead}>
            To build a football club that creates opportunity, develops talent and brings people
            together through the power of sport.
          </p>
          <p data-reveal="80" className={s.statementBody}>
            Blue Phoenix FC is committed to building strong foundations, developing players and
            teams, engaging our supporters and embracing innovation across football and beyond. We
            strive to compete with purpose, earn every step of our journey and create a club our
            players, fans and community can proudly call their own.
          </p>
          <Link href="/the-club" data-reveal="140" className={s.statementLink}>
            What the club stands for →
          </Link>
        </div>
      </section>

      <FoundersCarousel />
      <Chant />

      {/* News ---------------------------------------------------------- */}
      <section aria-labelledby="news-title" className={s.news}>
        <div className={s.newsHead}>
          <h2 id="news-title" data-reveal="0" className={`display ${s.newsTitle}`}>
            News &amp; press
          </h2>
          <Link href="/news" className="linkRule">
            View all news →
          </Link>
        </div>

        <div className={s.newsGrid}>
          <Link href={feature.href} data-reveal="0" className={s.feature}>
            <div className={s.featureFrame}>
              <FillImage
                src={feature.img}
                alt={feature.imgAlt}
                sizes="(max-width: 980px) 100vw, 50vw"
              />
            </div>
            <p className={s.featureMeta}>
              <strong>{feature.cat}</strong> · {feature.dateLabel}
            </p>
            <h3 className={s.featureTitle}>{feature.title}</h3>
            <p className={s.featureExcerpt}>{feature.excerpt}</p>
            <span className={s.featureCta}>Read article →</span>
          </Link>

          <div className={s.newsRest}>
            {rest.map((n, i) => (
              <Link key={n.slug} href={n.href} data-reveal={80 * i} className={s.newsRow}>
                <div className={s.newsRowFrame}>
                  <FillImage src={n.img} alt={n.imgAlt} sizes="120px" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p className={s.newsRowMeta}>
                    <strong>{n.cat}</strong> · {n.dateLabel}
                  </p>
                  <h3 className={s.newsRowTitle}>{n.title}</h3>
                  <span className={s.newsRowCta}>Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join ---------------------------------------------------------- */}
      <section aria-labelledby="join-title" className={s.join}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <FillImage src={IMG.fans} alt="Blue Phoenix FC supporters" sizes="100vw" />
        </div>
        <div aria-hidden="true" className={s.joinScrim} />
        <div className={s.joinInner}>
          <h2 id="join-title" data-reveal="0" className={`display ${s.joinTitle}`}>
            The rise starts with us.
          </h2>
          <p data-reveal="80" className={s.joinBody}>
            Be there before the first whistle. Join the journey and become part of the Blue Phoenix
            FC community.
          </p>
          <div data-reveal="140" className={s.joinActions}>
            <Link href="/fan-club#join" className="btn btnPrimary">
              BECOME A FAN
            </Link>
            <Link href="/register" className="btn btnLight">
              REGISTER YOUR INTEREST
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
