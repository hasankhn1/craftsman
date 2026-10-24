import Link from 'next/link';
import { NAV_ITEMS, SOCIALS } from '@/lib/site';
import { Crest } from './Media';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className={s.lead}>
          <Link href="/" aria-label="Blue Phoenix FC — home" className={s.brand}>
            <Crest size={64} fontSize={16} />
            <span className={s.brandName}>
              <span className={s.brandTop}>BLUE PHOENIX</span>
              <span className={s.brandSub}>FOOTBALL CLUB</span>
            </span>
          </Link>
          <p className={s.slogan}>Be a Blue. Be a Phoenix. Together We Rise Up.</p>
          <div className={s.leadActions}>
            <Link href="/fan-club#join" className="btn btnPrimary">
              BECOME A FAN
            </Link>
            <Link href="/register" className="btn btnPanel">
              REGISTER YOUR INTEREST
            </Link>
          </div>
        </div>

        <nav aria-label="Footer" className={s.col}>
          <h2 className={s.colTitle}>The club</h2>
          {NAV_ITEMS.map((l) => (
            <Link key={l.id} href={l.href} className={s.colLink}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={s.col}>
          <h2 className={s.colTitle}>Follow the rise</h2>
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener"
              className={s.colLink}
            >
              {social.name}
            </a>
          ))}
        </div>

        <section aria-labelledby="footer-contact" className={s.contact}>
          <span aria-hidden="true" className={s.contactRule} />
          <h2 id="footer-contact" className={s.contactTitle}>
            Contact the club
          </h2>
          <p className={s.contactText}>Partnerships, media and general questions.</p>
          <Link href="/register#enquiry" className={s.contactCta}>
            SEND AN ENQUIRY <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>

      <div aria-hidden="true" className={s.ghost}>
        BLUE PHOENIX
      </div>

      <div className={s.base}>
        <span>© 2026 Blue Phoenix FC. QSM World LLC. All Rights Reserved.</span>
        <span className={s.baseLinks}>
          <Link href="/legal#privacy">Privacy Policy</Link>
          <Link href="/legal#cookies">Cookies</Link>
          <Link href="/legal#terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
