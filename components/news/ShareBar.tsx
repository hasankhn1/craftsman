'use client';

import { useState } from 'react';
import s from '@/app/news/[slug]/article.module.css';

export default function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const targets = [
    { name: 'X', href: `https://x.com/intent/tweet?url=${u}&text=${t}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
  ];

  const copy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, done);
    else done();
  };

  return (
    <aside aria-label="Share" className={s.share}>
      <p className={s.shareLabel}>Share this story</p>
      <div className={s.shareLinks}>
        {targets.map((target) => (
          <a
            key={target.name}
            href={target.href}
            target="_blank"
            rel="noopener"
            className={s.shareBtn}
          >
            {target.name}
          </a>
        ))}
        <button type="button" onClick={copy} className={s.shareBtn}>
          {copied ? 'Link copied' : 'Copy link'}
        </button>
      </div>
    </aside>
  );
}
