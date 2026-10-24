import type { Metadata } from 'next';
import Link from 'next/link';
import Page from '@/components/Page';
import { FillImage } from '@/components/Media';
import JourneyProgress from '@/components/journey/JourneyProgress';
import JourneyRoad from '@/components/journey/JourneyRoad';
import { IMG, MEDIA } from '@/lib/site';
import s from './journey.module.css';

export const metadata: Metadata = {
  title: 'Our Journey',
  description:
    'The story of Blue Phoenix FC: why the club exists, what blue and the phoenix stand for, and the road to the 2027/28 season.',
  alternates: { canonical: '/our-journey' },
  openGraph: {
    title: 'Our Journey — Blue Phoenix FC',
    description: 'Start at the ground, build the foundations, earn every step and rise.',
    images: [IMG.begins],
  },
};

const FOUNDATIONS = [
  'Players & coaching',
  'Operations',
  'Commercial development',
  'Media',
  'Technology',
  'Fan engagement',
];

const MORE_THAN_NINETY = [
  { title: 'Young players', text: 'Something to aspire to.' },
  { title: 'Supporters', text: 'Something to believe in.' },
  { title: 'A community', text: 'Something to be proud of.' },
];

export default function JourneyPage() {
  return (
    <Page theme="navy" active="journey">
      <JourneyProgress />

      {/* Hero ---------------------------------------------------------- */}
      <section data-chapter="Our journey" className={s.hero}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <FillImage
            src={MEDIA.journeyPitch.src}
            fallback={MEDIA.journeyPitch.fallback}
            alt="Blue Phoenix FC — the opening chapter"
            sizes="100vw"
            priority
          />
        </div>
        <div aria-hidden="true" className={s.heroScrim} />
        <div className={s.heroInner}>
          <h1 className={`display ${s.heroTitle}`}>
            From the
            <br />
            ground up.
          </h1>
          <p className={s.heroBody}>
            The first chapter of a new football story is being written in the UAE. This is how Blue
            Phoenix FC is being built — and why.
          </p>
        </div>
      </section>

      {/* The belief ---------------------------------------------------- */}
      <section data-chapter="The belief" aria-labelledby="c1" className={s.belief}>
        <div className={s.beliefInner}>
          <h2 id="c1" data-reveal="0" className={`display ${s.beliefTitle}`}>
            Every club has a beginning.
          </h2>
          <div className={s.beliefCols}>
            <p data-reveal="80" className={s.beliefLead}>
              Long before the first match, the first goal or the first trophy, there is an idea — a
              belief that something worth building can become something real.
            </p>
            <p data-reveal="140" className={s.beliefBody}>
              For Blue Phoenix FC, that moment is now. The club is being built from the ground up
              with a clear ambition: a modern football club with a strong identity, a genuine
              connection with its fans and a long-term vision for the future of the game.
            </p>
          </div>
        </div>
      </section>

      {/* More than ninety minutes -------------------------------------- */}
      <section data-chapter="Why the club exists" aria-labelledby="c2" className={s.ninety}>
        <div className={s.ninetyHead}>
          <h2 id="c2" data-reveal="0" className={`display ${s.ninetyTitle}`}>
            More than ninety minutes.
          </h2>
          <p data-reveal="80" className={s.ninetyBody}>
            A football club should be about more than what happens on a pitch. It should be about
            people, opportunity, ambition and belonging.
          </p>
        </div>
        <div className={s.ninetyCards}>
          {MORE_THAN_NINETY.map((card, i) => (
            <div
              key={card.title}
              data-reveal={80 * i}
              className={i === 2 ? s.ninetyCardDark : s.ninetyCard}
            >
              <p className={s.ninetyCardTitle}>{card.title}</p>
              <p className={s.ninetyCardText}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phoenix -------------------------------------------------------- */}
      <section data-chapter="The phoenix" aria-labelledby="c4" className={s.phoenix}>
        <div className={s.phoenixGrid}>
          <div style={{ minWidth: 0 }}>
            <h2 id="c4" data-reveal="0" className={`display ${s.phoenixTitle}`}>
              Phoenix
            </h2>
            <p data-reveal="80" className={s.phoenixLead}>
              The Phoenix is the spirit — resilience, transformation and the ability to rise again,
              stronger than before.
            </p>
            <p data-reveal="140" className={s.phoenixBody}>
              For the player, it represents opportunity. For the supporter, belonging. For the young
              fan dreaming of playing, possibility. For the people building the club,
              responsibility.
            </p>
            <p data-reveal="200" className={s.phoenixKicker}>
              When you wear the Phoenix, you are carrying the story forward.
            </p>
          </div>
          <div data-reveal="0" className={s.phoenixFrame}>
            <FillImage
              src={MEDIA.journeyPhoenix.src}
              fallback={MEDIA.journeyPhoenix.fallback}
              alt="Blue Phoenix FC crest detail"
              sizes="(max-width: 980px) 100vw, 400px"
            />
          </div>
        </div>
      </section>

      {/* The work nobody sees ------------------------------------------ */}
      <section data-chapter="Building" aria-labelledby="c5" className={s.building}>
        <div className={s.buildingGrid}>
          <div style={{ minWidth: 0 }}>
            <h2 id="c5" data-reveal="0" className={`display ${s.buildingTitle}`}>
              The work nobody sees.
            </h2>
            <p data-reveal="80" className={s.buildingBody}>
              Clubs are built in planning meetings, training grounds, recruitment decisions and
              conversations with partners. If the ambition is to climb, the foundations have to carry
              its weight.
            </p>
            <div data-reveal="140" className={s.buildingFrame}>
              <FillImage
                src={MEDIA.firstWhistle.src}
                fallback={MEDIA.firstWhistle.fallback}
                alt="Behind the scenes at Blue Phoenix FC"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 data-reveal="0" className={s.foundationsLabel}>
              Foundations being laid
            </h3>
            <ul className={s.foundations}>
              {FOUNDATIONS.map((label, i) => (
                <li key={label} data-reveal={50 * i} className={s.foundation}>
                  {label}
                </li>
              ))}
            </ul>
            <p data-reveal="200" className={s.foundationsNote}>
              The badge may be new. The ambition is not.
            </p>
          </div>
        </div>
      </section>

      {/* Early supporters ---------------------------------------------- */}
      <section data-chapter="Early supporters" aria-labelledby="c6" className={s.supporters}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <FillImage
            src={MEDIA.stadium.src}
            fallback={MEDIA.stadium.fallback}
            alt="Supporters in a stadium"
            sizes="100vw"
          />
        </div>
        <div aria-hidden="true" className={s.supportersScrim} />
        <div className={s.supportersInner}>
          <h2 id="c6" data-reveal="0" className={`display ${s.supportersTitle}`}>
            They help create it.
          </h2>
          <p data-reveal="80" className={s.supportersBody}>
            Most clubs introduce their supporters on matchday. Blue Phoenix wants them here much
            earlier — to remember the first player announced, the first shirt revealed, the moment
            the countdown reaches zero. The supporters don&rsquo;t just inherit history.
          </p>
        </div>
      </section>

      {/* The ambition --------------------------------------------------- */}
      <section data-chapter="The 2027/28 ambition" aria-labelledby="c7" className={s.ambition}>
        <h2 id="c7" data-reveal="0" className={`display ${s.ambitionTitle}`}>
          The ambition, stated plainly.
        </h2>
        <div className={s.ambitionCards}>
          <div data-reveal="0" className={s.ambitionCard}>
            <p className={s.ambitionKicker}>The immediate objective</p>
            <p className={s.ambitionHeading}>UAE Third Division, 2027/28.</p>
            <p className={s.ambitionText}>
              Working towards competing in the club&rsquo;s first season.
            </p>
          </div>
          <div data-reveal="80" className={s.ambitionCard}>
            <p className={s.ambitionKicker}>Then</p>
            <p className={s.ambitionHeading}>Earn every step.</p>
            <p className={s.ambitionText}>
              Grow through the levels of UAE football while developing players and creating
              opportunity.
            </p>
          </div>
          <div data-reveal="160" className={s.ambitionCard}>
            <p className={s.ambitionKickerInk}>The long-term ambition</p>
            <p className={s.ambitionHeading}>The UAE Pro League — and beyond.</p>
            <p className={s.ambitionTextInk}>
              A global football brand originating from the UAE. An ambition, not a promise.
            </p>
          </div>
        </div>
      </section>

      <JourneyRoad />

      {/* Join the journey ----------------------------------------------- */}
      <section data-chapter="Join the journey" aria-labelledby="c9" className={s.outro}>
        <h2 id="c9" data-reveal="0" className={`display ${s.outroTitle}`}>
          Be part of the rise
        </h2>
        <p data-reveal="80" className={s.outroBody}>
          If you&rsquo;re joining now, you&rsquo;re not early. You&rsquo;re exactly where you should
          be.
        </p>
        <div data-reveal="140" className={s.outroActions}>
          <Link href="/fan-club#join" className="btn btnDark">
            CLAIM YOUR PLACE
          </Link>
          <Link href="/news" className="btn btnOutlineDark">
            READ THE JOURNEY
          </Link>
        </div>
      </section>
    </Page>
  );
}
