import type { Metadata } from 'next';
import Page from '@/components/Page';
import RegisterForm from '@/components/register/RegisterForm';
import s from './register.module.css';

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Register player interest or send a club enquiry to Blue Phoenix FC ahead of the 2027/28 season.',
  alternates: { canonical: '/register' },
  openGraph: { title: 'Register — Blue Phoenix FC' },
};

export default function RegisterPage() {
  return (
    <Page theme="paper" active="register" solid>
      <section aria-labelledby="reg-h" className={s.hero}>
        <div className={s.heroGrid}>
          <h1 id="reg-h" className={`display ${s.heroTitle}`}>
            Register your interest.
          </h1>
          <p className={s.heroBody}>
            Blue Phoenix FC is pre-launch. Recruitment and trials haven&rsquo;t opened yet — but you
            can tell us you&rsquo;re interested, and the club will contact you when they do.
          </p>
        </div>

        <div className={s.status}>
          <div className={s.statusCard}>
            <p className={s.statusState}>Open · interest only</p>
            <p className={s.statusTitle}>Player interest</p>
            <p className={s.statusText}>
              Register now; you&rsquo;ll hear first when recruitment opens.
            </p>
          </div>
          <div className={s.statusCard}>
            <p className={s.statusStateMuted}>Not yet open</p>
            <p className={s.statusTitle}>Trials &amp; season registration</p>
            <p className={s.statusText}>Dates and criteria will be announced by the club.</p>
          </div>
          <div className={s.statusCard}>
            <p className={s.statusState}>Open</p>
            <p className={s.statusTitle}>Club enquiries</p>
            <p className={s.statusText}>Partnerships, media and general questions.</p>
          </div>
        </div>
      </section>

      <RegisterForm />
    </Page>
  );
}
