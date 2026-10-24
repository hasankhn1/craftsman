'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { submitForm } from '@/lib/site';
import s from '@/app/register/register.module.css';

type Pathway = 'player' | 'enquiry';

type FieldDef = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  email?: boolean;
  select?: string[];
  area?: boolean;
  full?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PLAYER_FIELDS: FieldDef[] = [
  { name: 'name', label: 'Full name *', type: 'text', autoComplete: 'name', required: true },
  {
    name: 'email',
    label: 'Email *',
    type: 'email',
    autoComplete: 'email',
    required: true,
    email: true,
  },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel' },
  {
    name: 'city',
    label: 'City / Emirate *',
    type: 'text',
    autoComplete: 'address-level2',
    required: true,
  },
  {
    name: 'position',
    label: 'Position *',
    select: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
    required: true,
  },
  {
    name: 'level',
    label: 'Current playing level *',
    select: [
      'Grassroots / recreational',
      'Academy / youth',
      'Amateur league',
      'Semi-professional',
      'Professional',
    ],
    required: true,
  },
  { name: 'about', label: 'Tell us about your football (optional)', area: true, full: true },
];

const ENQUIRY_FIELDS: FieldDef[] = [
  { name: 'name', label: 'Full name *', type: 'text', autoComplete: 'name', required: true },
  {
    name: 'email',
    label: 'Email *',
    type: 'email',
    autoComplete: 'email',
    required: true,
    email: true,
  },
  { name: 'org', label: 'Organisation (optional)', type: 'text', autoComplete: 'organization' },
  {
    name: 'topic',
    label: 'Topic *',
    select: ['Partnership or sponsorship', 'Media', 'General question'],
    required: true,
  },
  { name: 'message', label: 'Your message *', area: true, full: true, required: true },
];

export default function RegisterForm() {
  const [path, setPath] = useState<Pathway>('player');
  const [values, setValues] = useState<Record<string, string>>({});
  const [age, setAge] = useState('');
  const [consent, setConsent] = useState(false);
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [connected, setConnected] = useState(true);
  const [sendErr, setSendErr] = useState('');
  const doneRef = useRef<HTMLDivElement>(null);

  // Deep links: /register#player and /register#enquiry open that pathway.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash !== 'player' && hash !== 'enquiry') return;
    setPath(hash);
    const t = setTimeout(() => {
      const el = document.getElementById('form');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80 });
    }, 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const isPlayer = path === 'player';
  const fields = isPlayer ? PLAYER_FIELDS : ENQUIRY_FIELDS;

  const validate = () => {
    const errs: Record<string, string> = {};
    fields.forEach((f) => {
      const v = (values[f.name] || '').trim();
      if (f.required && !v) errs[f.name] = 'This field is required.';
      else if (f.email && v && !EMAIL_RE.test(v))
        errs[f.name] = 'Enter a valid email address, like name@example.com.';
    });
    if (isPlayer && !age) errs.age = 'Please confirm your age.';
    if (!consent) errs.consent = 'We need your consent to store and reply to your details.';
    return errs;
  };

  const errs = tried ? validate() : {};

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    const r = await submitForm(`register-${path}`, {
      pathway: path,
      ...values,
      ageGroup: age,
      consent: true,
    });
    setSending(false);
    if (r.ok) {
      setDone(true);
      setConnected(r.connected);
    } else {
      setSendErr('Something went wrong sending your details. Please try again in a moment.');
    }
  };

  const switchTo = (next: Pathway) => () => {
    setPath(next);
    setTried(false);
    setSendErr('');
  };

  const firstName = (values.name || '').trim().split(' ')[0] || 'there';

  return (
    <section id="form" aria-labelledby="form-h" className={s.formSection}>
      <div className={s.formGrid}>
        <div style={{ minWidth: 0 }}>
          <h2 id="form-h" className={`display ${s.pathTitle}`}>
            {isPlayer ? 'Player interest' : 'Club enquiry'}
          </h2>
          <p className={s.pathText}>
            {isPlayer
              ? 'Recruitment and trials are not open yet. Registering interest is not an application or a trial invitation — it lets the club contact you when recruitment opens.'
              : 'Partnerships, sponsorship, media requests or a general question for the club. We read every message.'}
          </p>
          <div role="tablist" aria-label="Choose a pathway" className={s.tabs}>
            <button
              type="button"
              role="tab"
              id="player"
              aria-selected={isPlayer}
              onClick={switchTo('player')}
              className={`${s.tab} ${isPlayer ? s.tabOn : ''}`}
            >
              Player interest
            </button>
            <button
              type="button"
              role="tab"
              id="enquiry"
              aria-selected={!isPlayer}
              onClick={switchTo('enquiry')}
              className={`${s.tab} ${!isPlayer ? s.tabOn : ''}`}
            >
              Club enquiry
            </button>
          </div>
          <p className={s.privacyNote}>
            We only ask for what we need to reply. No payment details, no documents. See the{' '}
            <Link href="/legal#privacy">privacy notice</Link>.
          </p>
        </div>

        <div className={s.formCol}>
          {done ? (
            <div role="status" tabIndex={-1} ref={doneRef} className={s.done}>
              <p className={s.doneTitle}>Thank you, {firstName}.</p>
              <p className={s.doneText}>
                {isPlayer
                  ? 'Your interest is registered. When player recruitment opens, the club will be in touch using the email you gave.'
                  : 'Your message has been received. The club will reply to the email you gave.'}
              </p>
              {!connected && (
                <p className={s.previewNote}>
                  <strong>Preview build:</strong> the form service isn&rsquo;t connected yet, so this
                  submission was only saved in this browser and has not reached the club. Set{' '}
                  <strong>NEXT_PUBLIC_FORM_ENDPOINT</strong> to go live.
                </p>
              )}
              <div className={s.doneActions}>
                <Link href="/fan-club#join" className="btn btnPrimary">
                  JOIN THE FAN CLUB
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setValues({});
                    setAge('');
                    setConsent(false);
                    setTried(false);
                    setDone(false);
                  }}
                  className="btn btnLight"
                >
                  SEND ANOTHER
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-describedby="req-note" className={s.form}>
              <p id="req-note" className={s.reqNote}>
                Fields marked * are required.
              </p>

              {tried && Object.keys(errs).length > 0 && (
                <div role="alert" className={s.alert}>
                  Please check the {Object.keys(errs).length} highlighted field(s).
                </div>
              )}

              {fields.map((f) => {
                const err = errs[f.name] || '';
                const id = `f-${f.name}`;
                const errId = `e-${f.name}`;
                const shared = {
                  id,
                  name: f.name,
                  value: values[f.name] || '',
                  'aria-invalid': err ? ('true' as const) : ('false' as const),
                  'aria-describedby': err ? errId : undefined,
                  className: 'control',
                  onChange: (
                    e: React.ChangeEvent<
                      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                    >,
                  ) => setValues((v) => ({ ...v, [f.name]: e.target.value })),
                };

                return (
                  <div key={f.name} className={`field ${f.full ? s.full : ''}`}>
                    <label htmlFor={id} className="fieldLabel">
                      {f.label}
                    </label>
                    {f.select ? (
                      <select {...shared}>
                        <option value="">Select…</option>
                        {f.select.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : f.area ? (
                      <textarea rows={5} {...shared} />
                    ) : (
                      <input type={f.type} autoComplete={f.autoComplete} {...shared} />
                    )}
                    {err && (
                      <span id={errId} className="fieldError">
                        {err}
                      </span>
                    )}
                  </div>
                );
              })}

              {isPlayer && (
                <fieldset className={s.ageSet} aria-describedby="age-err">
                  <legend className={s.ageLegend}>Age *</legend>
                  <label className={s.ageOption}>
                    <input
                      type="radio"
                      name="age"
                      checked={age === '18+'}
                      onChange={() => setAge('18+')}
                      className="radio"
                    />
                    I&rsquo;m 18 or over
                  </label>
                  <label className={s.ageOption}>
                    <input
                      type="radio"
                      name="age"
                      checked={age === 'under-18'}
                      onChange={() => setAge('under-18')}
                      className="radio"
                    />
                    I&rsquo;m under 18 — my parent or guardian is completing this form
                  </label>
                  {errs.age && (
                    <span id="age-err" className="fieldError">
                      {errs.age}
                    </span>
                  )}
                </fieldset>
              )}

              <label className={s.consent}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={() => setConsent((c) => !c)}
                  aria-describedby="consent-err"
                  className="checkbox"
                />
                <span>
                  I agree that Blue Phoenix FC may store these details and contact me about this{' '}
                  {isPlayer ? 'player interest and future recruitment' : 'enquiry'}. I can ask for
                  them to be deleted at any time. *
                </span>
              </label>
              {errs.consent && (
                <span id="consent-err" className={`fieldError ${s.consentErr}`}>
                  {errs.consent}
                </span>
              )}

              <div className={s.submitRow}>
                <button
                  type="submit"
                  disabled={sending}
                  className={`btn btnPrimary ${s.submit}`}
                >
                  {sending ? 'SENDING…' : isPlayer ? 'REGISTER INTEREST' : 'SEND ENQUIRY'}
                </button>
                {sendErr && (
                  <span role="alert" className="fieldError">
                    {sendErr}
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
