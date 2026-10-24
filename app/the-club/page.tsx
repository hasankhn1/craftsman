import type { Metadata } from 'next';
import Link from 'next/link';
import Page from '@/components/Page';
import { FillImage } from '@/components/Media';
import { IMG } from '@/lib/site';
import s from './club.module.css';

export const metadata: Metadata = {
  title: 'The Club',
  description:
    "Blue Phoenix FC's mission, vision, values and identity — a football club being built from the ground up in the UAE.",
  alternates: { canonical: '/the-club' },
  openGraph: {
    title: 'The Club — Blue Phoenix FC',
    description: 'Rise, compete, and build something that lasts.',
  },
};

const VALUES: [string, string][] = [
  [
    'Ambition',
    'Start at the ground, build the foundations, earn every step and rise. The badge may be new; the ambition is not.',
  ],
  [
    'Resilience',
    'The Phoenix: the willingness to rebuild, keep moving forward and become stronger with every challenge.',
  ],
  [
    'Community',
    'A club without its people is only a badge. Fans, players and the wider football community, together from the beginning.',
  ],
  [
    'Innovation',
    'A club that understands modern football — across media, technology and fan experience — while respecting what makes the game special.',
  ],
];

export default function ClubPage() {
  return (
    <Page theme="navy" active="club" solid>
      {/* Hero ---------------------------------------------------------- */}
      <section aria-labelledby="club-title" className={s.hero}>
        <div className={s.heroGrid}>
          <div style={{ minWidth: 0 }}>
            <h1 id="club-title" className={`display ${s.heroTitle}`}>
              Rise. Compete. Build to last.
            </h1>
            <p className={s.heroLead}>
              Blue Phoenix FC is a new football club being built from the ground up in the UAE — a
              modern, ambitious and community-driven sporting institution.
            </p>
            <p className={s.heroBody}>
              A football club development project of QSM World. More than a team: an identity built
              around ambition, resilience and belonging, bringing players, fans and the wider
              football community together under one belief — rise, compete, and build something that
              lasts.
            </p>
          </div>
          <div aria-hidden="true" className={s.heroMark}>
            <span className={s.heroMarkText}>BPFC</span>
            <div className={s.heroMarkCrest} />
          </div>
        </div>
      </section>

      {/* Founding line -------------------------------------------------- */}
      <section aria-label="Founding line" className={s.quoteSection}>
        <blockquote data-reveal="0" className={s.quote}>
          <p className={s.quoteText}>
            &ldquo;Dream driven by passion ignited the Blue fire which gave birth to the legendary
            Phoenix.&rdquo;
          </p>
        </blockquote>
        <p data-reveal="80" className={s.quoteNote}>
          From a project to a football club. From a football club to a global brand.
        </p>
      </section>

      {/* Mission and vision --------------------------------------------- */}
      <section aria-labelledby="mv-title" className={s.mv}>
        <h2 id="mv-title" className="srOnly">
          Mission and vision
        </h2>

        <div className={s.mvRow}>
          <h3 data-reveal="0" className={`display ${s.mvHeading}`}>
            Mission
          </h3>
          <div className={s.mvBody}>
            <p data-reveal="60" className={s.mvLead}>
              To build a football club that creates opportunity, develops talent and brings people
              together through the power of sport.
            </p>
            <p data-reveal="120" className={s.mvText}>
              Blue Phoenix FC is committed to building strong foundations, developing players and
              teams, engaging our supporters and embracing innovation across football and beyond. We
              strive to compete with purpose, earn every step of our journey and create a club that
              our players, fans and community can proudly call their own.
            </p>
          </div>
        </div>

        <div className={s.mvRule} />

        <div className={s.mvRow}>
          <h3 data-reveal="0" className={`display ${s.mvHeading}`}>
            Vision
          </h3>
          <div className={s.mvBody}>
            <p data-reveal="60" className={s.mvLead}>
              To build Blue Phoenix FC into a leading football club from the UAE, rising from the
              ground up through ambition, talent, innovation and an unwavering connection with our
              fans.
            </p>
            <p data-reveal="120" className={s.mvText}>
              We aim to create a club that develops players, inspires communities and embraces the
              future of sport, while building a distinctive identity that can grow from the UAE to
              the world. We are not simply building a team for today — we are building a football
              institution for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* Values ---------------------------------------------------------- */}
      <section aria-labelledby="values-title" className={s.values}>
        <h2 id="values-title" data-reveal="0" className={`display ${s.valuesTitle}`}>
          What we value
        </h2>
        <div className={s.valuesList}>
          {VALUES.map(([name, text], i) => (
            <div key={name} data-reveal={60 * i} className={s.valueRow}>
              <p className={s.valueName}>{name}</p>
              <p className={s.valueText}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Identity -------------------------------------------------------- */}
      <section aria-labelledby="id-title" className={s.identity}>
        <h2 id="id-title" data-reveal="0" className={s.identityLabel}>
          The meaning of the name
        </h2>
        <div className={s.identityLines}>
          <p data-reveal="0" className={s.identityLine}>
            Blue is the identity.
          </p>
          <p data-reveal="80" className={`${s.identityLine} ${s.identityBlue}`}>
            Phoenix is the spirit.
          </p>
          <p data-reveal="160" className={`${s.identityLine} ${s.identitySteel}`}>
            Football is the game.
          </p>
        </div>
        <div className={s.identityCols}>
          <p data-reveal="0" className={s.identityCol}>
            <strong>Blue</strong> stands for confidence, ambition, trust and belonging — the identity
            people can recognise, wear, defend and believe in.
          </p>
          <p data-reveal="80" className={s.identityCol}>
            <strong>The Phoenix</strong> stands for resilience, transformation and the ability to
            rise again, stronger than before — the willingness to rebuild and keep moving forward.
          </p>
        </div>
      </section>

      {/* Pathway ---------------------------------------------------------- */}
      <section aria-labelledby="dev-title" className={s.pathway}>
        <div className={s.pathwayHead}>
          <h2 id="dev-title" data-reveal="0" className={`display ${s.pathwayTitle}`}>
            A pathway, not a one-season team.
          </h2>
          <p data-reveal="80" className={s.pathwayBody}>
            The club aims to build a sustainable pathway from grassroots and player development
            through to professional football — giving young players something real to aspire to.
          </p>
        </div>
        <ol className={s.pathwayList}>
          <li data-reveal="0" className={s.pathwayStep}>
            <span className={s.pathwayStepName}>Grassroots</span>
            <span className={s.pathwayStepText}>Youth engagement and community football.</span>
          </li>
          <li data-reveal="70" className={s.pathwayStep}>
            <span className={s.pathwayStepName}>Player development</span>
            <span className={s.pathwayStepText}>
              Developing players and teams with long-term intent.
            </span>
          </li>
          <li data-reveal="140" className={s.pathwayStepAccent}>
            <span className={s.pathwayStepName}>Professional football</span>
            <span className={s.pathwayStepText}>Competing with purpose, earning every step.</span>
          </li>
        </ol>
      </section>

      {/* Built in the UAE -------------------------------------------------- */}
      <section aria-labelledby="uae-title" className={s.uae}>
        <div className={s.uaeGrid}>
          <div data-reveal="0" className={s.uaeFrame}>
            <FillImage
              src={IMG.begins}
              alt="A pitch in the UAE"
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 id="uae-title" data-reveal="0" className={`display ${s.uaeTitle}`}>
              Built in the UAE.
            </h2>
            <p data-reveal="80" className={s.uaeBody}>
              The UAE football landscape presents an opportunity for a new generation of clubs to
              think differently. Blue Phoenix intends to embrace it — a club that understands modern
              football while respecting everything that makes the game special.
            </p>
            <p data-reveal="140" className={s.uaeBody}>
              The first objective is the UAE Third Division in 2027/28. The long-term ambition is the
              UAE Pro League, and a football brand that carries the UAE to the world.
            </p>
          </div>
        </div>
      </section>

      {/* Chant ------------------------------------------------------------- */}
      <section aria-labelledby="club-chant" className={s.chant}>
        <h2 id="club-chant" className={s.chantLabel}>
          The club chant
        </h2>
        <p data-reveal="0" className={s.chantWord}>
          Deh-Shay
          <br />
          Bah-Sah-Rah
        </p>
        <p data-reveal="80" className={s.chantRise}>
          We rise up.
        </p>
      </section>

      {/* Continue ---------------------------------------------------------- */}
      <section aria-label="Continue" className={s.continue}>
        <Link href="/team" className={s.continueDark}>
          <span className={s.continueKicker}>The people building it</span>
          <span className={s.continueTitle}>Founding team →</span>
        </Link>
        <Link href="/fan-club" className={s.continueBlue}>
          <span className={s.continueKicker}>The people behind it</span>
          <span className={s.continueTitle}>Fan club →</span>
        </Link>
      </section>
    </Page>
  );
}
