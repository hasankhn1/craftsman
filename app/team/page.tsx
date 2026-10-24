import type { Metadata } from 'next';
import Link from 'next/link';
import Page from '@/components/Page';
import FoundersRail from '@/components/team/FoundersRail';
import s from './team.module.css';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'The founding leadership of Blue Phoenix FC. Squad and coaching announcements will follow.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Team — Blue Phoenix FC',
    description: 'The people building Blue Phoenix FC from the ground up.',
  },
};

const GROUPS = ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards', 'Coaching staff'];

export default function TeamPage() {
  return (
    <Page theme="white" active="team" solid>
      <section aria-labelledby="team-h" className={s.hero}>
        <h1 id="team-h" className={`display ${s.heroTitle}`}>
          The
          <br />
          founders.
        </h1>
      </section>

      <section aria-labelledby="lead-h" className={s.people}>
        <h2 id="lead-h" className="srOnly">
          Founders &amp; Directors
        </h2>
        <FoundersRail />
      </section>

      <section aria-labelledby="squad-h" className={s.squad}>
        <div className={s.squadHead}>
          <h2 id="squad-h" data-reveal="0" className={`display ${s.squadTitle}`}>
            Squad announcements coming soon.
          </h2>
          <p data-reveal="80" className={s.squadBody}>
            No players, coaches or staff have been announced yet. When the club confirms them,
            they&rsquo;ll appear here first — with positions, squad numbers and their stories.
          </p>
        </div>

        <div className={s.squadGrid}>
          {GROUPS.map((name, i) => (
            <div key={name} data-reveal={50 * i} className={s.squadCard}>
              <h3 className={s.squadCardName}>{name}</h3>
              <div className={s.squadCardMeta}>
                <span className={s.squadCardDash}>—</span>
                <span className={s.squadCardNote}>To be announced</span>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal="0" className={s.playerCta}>
          <p className={s.playerCtaText}>
            A player who wants to be part of the first chapter?
          </p>
          <div className={s.playerCtaActions}>
            <Link href="/register#player" className="btn btnPrimary">
              REGISTER PLAYER INTEREST
            </Link>
            <Link href="/fan-club#join" className="btn btnLight">
              GET ANNOUNCEMENTS FIRST
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
