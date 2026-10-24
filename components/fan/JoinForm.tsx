'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { fmtDate, submitForm } from '@/lib/site';
import s from '@/app/fan-club/fan.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PLACES = [
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ajman',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah',
  'Outside the UAE',
];

const INTERESTS = [
  'Club news',
  'Squad announcements',
  'Matchday & season',
  'Volunteering & community',
];

export default function JoinForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [where, setWhere] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [connected, setConnected] = useState(true);
  const [sendErr, setSendErr] = useState('');
  const [joinedOn, setJoinedOn] = useState('');
  const welcomeRef = useRef<HTMLHeadingElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Tell us your first name.';
    if (!email.trim()) e.email = 'Enter your email so we can send updates.';
    else if (!EMAIL_RE.test(email.trim()))
      e.email = 'Enter a valid email address, like name@example.com.';
    if (!where) e.where = 'Choose where you’re based.';
    if (!consent) e.consent = 'Tick the box so we’re allowed to email you.';
    return e;
  };

  const errs = tried ? validate() : {};

  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = 'hidden';
    welcomeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const next = validate();
    setTried(true);
    setSendErr('');
    if (Object.keys(next).length) {
      setTimeout(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      }, 50);
      return;
    }
    setSending(true);
    const r = await submitForm('fan-club', {
      firstName: name.trim(),
      email: email.trim(),
      location: where,
      interests,
      consent: true,
    });
    setSending(false);
    if (r.ok) {
      setJoinedOn(fmtDate(new Date().toISOString()));
      setDone(true);
      setConnected(r.connected);
    } else {
      setSendErr('We couldn’t send that just now. Please try again in a moment.');
    }
  };

  const close = () => {
    setDone(false);
    setName('');
    setEmail('');
    setWhere('');
    setInterests([]);
    setConsent(false);
    setTried(false);
  };

  return (
    <>
      <section id="join" aria-labelledby="join-h" className={s.join}>
        <div className={s.joinGrid}>
          <div style={{ minWidth: 0 }}>
            <h2 id="join-h" className={`display ${s.joinTitle}`}>
              Claim your place in the rise.
            </h2>
            <p className={s.joinBody}>
              Free to join. We&rsquo;ll email you club announcements, behind-the-scenes updates and
              news on the road to the first season. Unsubscribe any time.
            </p>
          </div>

          <form noValidate onSubmit={onSubmit} className={s.form}>
            {tried && Object.keys(errs).length > 0 && (
              <div role="alert" className={s.alert}>
                Please check the highlighted fields.
              </div>
            )}

            <div className={s.formRow}>
              <div className="field">
                <label htmlFor="fan-name" className="fieldLabel">
                  First name *
                </label>
                <input
                  id="fan-name"
                  type="text"
                  autoComplete="given-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={errs.name ? 'true' : 'false'}
                  aria-describedby={errs.name ? 'fan-name-e' : undefined}
                  className="control"
                />
                {errs.name && (
                  <span id="fan-name-e" className="fieldError">
                    {errs.name}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="fan-country" className="fieldLabel">
                  Where are you based? *
                </label>
                <select
                  id="fan-country"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  aria-invalid={errs.where ? 'true' : 'false'}
                  aria-describedby={errs.where ? 'fan-where-e' : undefined}
                  className="control"
                >
                  <option value="">Select…</option>
                  {PLACES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errs.where && (
                  <span id="fan-where-e" className="fieldError">
                    {errs.where}
                  </span>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="fan-email" className="fieldLabel">
                Email *
              </label>
              <input
                id="fan-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errs.email ? 'true' : 'false'}
                aria-describedby={errs.email ? 'fan-email-e' : undefined}
                className="control"
              />
              {errs.email && (
                <span id="fan-email-e" className="fieldError">
                  {errs.email}
                </span>
              )}
            </div>

            <fieldset>
              <legend className={s.interestLegend}>I&rsquo;d like to hear about (optional)</legend>
              <div className={s.interests}>
                {INTERESTS.map((label) => {
                  const on = interests.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setInterests((list) =>
                          on ? list.filter((x) => x !== label) : [...list, label],
                        )
                      }
                      className={`chip ${on ? 'chipOn' : 'chipOff'}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className={s.consent}>
              <input
                type="checkbox"
                checked={consent}
                onChange={() => setConsent((c) => !c)}
                className="checkbox"
              />
              <span>
                Yes — email me Blue Phoenix FC fan club updates. My details are used only for this,
                never sold, and I can unsubscribe any time.{' '}
                <Link href="/legal#privacy">Privacy notice</Link>. *
              </span>
            </label>
            {errs.consent && (
              <span className={`fieldError ${s.consentErr}`}>{errs.consent}</span>
            )}

            <button type="submit" disabled={sending} className={`btn btnPrimary ${s.submit}`}>
              {sending ? 'JOINING…' : 'JOIN THE FAN CLUB'}
            </button>
            {sendErr && (
              <span role="alert" className="fieldError">
                {sendErr}
              </span>
            )}
          </form>
        </div>
      </section>

      {done && (
        <div role="dialog" aria-modal="true" aria-labelledby="welcome-h" className={s.welcome}>
          <div aria-hidden="true" className={s.welcomeCrest} />
          <div className={s.welcomeInner}>
            <p className={s.welcomeStamp}>Founding fan · {joinedOn}</p>
            <h2 id="welcome-h" tabIndex={-1} ref={welcomeRef} className={s.welcomeTitle}>
              Welcome to the beginning.
            </h2>
            <p className={s.welcomeText}>
              {name.trim() || 'You'}, you&rsquo;re part of the founding community of Blue Phoenix
              FC. When the firsts happen, you&rsquo;ll hear about them — and you&rsquo;ll be able to
              say you were there from chapter one.
            </p>
            <p lang="ar-Latn" className={s.welcomeChant}>
              Deh-Shay Bah-Sah-Rah. <span>We rise up.</span>
            </p>
            {!connected && (
              <p className={s.welcomeNote}>
                <strong>Preview build:</strong> the form service isn&rsquo;t connected, so this
                sign-up was saved only in this browser and has not reached the club. Set{' '}
                <strong>NEXT_PUBLIC_FORM_ENDPOINT</strong> to go live.
              </p>
            )}
            <div className={s.welcomeActions}>
              <Link href="/our-journey" className="btn btnPrimary">
                READ THE STORY SO FAR
              </Link>
              <a
                href="https://www.instagram.com/bluephoenixfc"
                target="_blank"
                rel="noopener"
                className="btn btnPanel"
              >
                FOLLOW ON INSTAGRAM
              </a>
              <button type="button" onClick={close} className="btn btnGhostLight">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
