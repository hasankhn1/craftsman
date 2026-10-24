import type { Metadata } from 'next';
import Link from 'next/link';
import Page from '@/components/Page';
import s from './legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy, Cookies & Terms',
  description: 'How Blue Phoenix FC handles the information you share through this website.',
  alternates: { canonical: '/legal' },
};

export default function LegalPage() {
  return (
    <Page theme="white" active="none" solid>
      <section className={s.hero}>
        <h1 className={`display ${s.heroTitle}`}>The small print.</h1>
        <p className={s.heroBody}>
          Plain-language notes on how this website treats your information. Draft for review by the
          club before launch.
        </p>
        <nav aria-label="On this page" className={s.jump}>
          <a href="#privacy" className={s.jumpLink}>
            Privacy
          </a>
          <a href="#cookies" className={s.jumpLink}>
            Cookies
          </a>
          <a href="#terms" className={s.jumpLink}>
            Terms
          </a>
        </nav>
      </section>

      <div className={s.body}>
        <section id="privacy" aria-labelledby="p-h" className={s.section}>
          <h2 id="p-h" className={s.sectionTitle}>
            Privacy
          </h2>
          <p className={s.para}>
            Blue Phoenix FC is a football club development project of QSM World LLC. When you join
            the fan club, register player interest or send an enquiry, we collect only what the form
            asks for: your name, email, and the details you choose to share.
          </p>
          <p className={s.para}>
            We use it to send the updates you asked for or to reply to you. We don&rsquo;t sell it or
            share it for others&rsquo; marketing. You can unsubscribe from fan club emails at any
            time, and you can ask for your details to be corrected or deleted using the{' '}
            <Link href="/register#enquiry">club enquiry form</Link>.
          </p>
          <p className={s.para}>
            Player interest from anyone under 18 must be submitted by a parent or guardian.
          </p>
        </section>

        <section id="cookies" aria-labelledby="c-h" className={s.section}>
          <h2 id="c-h" className={s.sectionTitle}>
            Cookies
          </h2>
          <p className={s.para}>
            This website doesn&rsquo;t set advertising or tracking cookies. If analytics are added
            before launch, this section will list them and a choice will be offered before any are
            set.
          </p>
        </section>

        <section id="terms" aria-labelledby="t-h" className={s.section}>
          <h2 id="t-h" className={s.sectionTitle}>
            Terms
          </h2>
          <p className={s.para}>
            The Blue Phoenix FC name, crest and content on this site belong to the club. Statements
            about future seasons and competitions describe the club&rsquo;s ambitions and objectives,
            not guarantees.
          </p>
          <p className={s.para}>
            Registering interest is not an offer of a trial, contract or membership.
          </p>
        </section>
      </div>
    </Page>
  );
}
