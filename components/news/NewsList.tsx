'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FillImage } from '@/components/Media';
import { CATEGORIES, NEWS } from '@/lib/site';
import s from '@/app/news/news.module.css';

export default function NewsList() {
  const params = useSearchParams();
  const initialCat = params.get('cat');
  const [cat, setCat] = useState(
    initialCat && CATEGORIES.includes(initialCat) ? initialCat : 'All',
  );
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      NEWS.filter(
        (n) =>
          (cat === 'All' || n.cat === cat) &&
          (!q || `${n.title} ${n.excerpt}`.toLowerCase().includes(q)),
      ),
    [cat, q],
  );

  const catEmpty = !q && results.length === 0;

  return (
    <section aria-labelledby="latest-h" className={s.latest}>
      <div className={s.latestHead}>
        <h2 id="latest-h" className={`display ${s.latestTitle}`}>
          Latest
        </h2>
        <label className={s.search}>
          <span className={s.searchLabel}>Search stories</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “phoenix” or “fans”"
            className={s.searchInput}
          />
        </label>
      </div>

      <div role="tablist" aria-label="Filter by category" className={s.filters}>
        {CATEGORIES.map((label) => {
          const count = label === 'All' ? NEWS.length : NEWS.filter((n) => n.cat === label).length;
          const selected = label === cat;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCat(label)}
              className={`chip ${selected ? 'chipOn' : 'chipOff'}`}
              style={selected ? undefined : { background: 'var(--paper)' }}
            >
              {label} <span className={s.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {results.length > 0 ? (
        <div className={s.list}>
          {results.map((n) => (
            <Link key={n.slug} href={n.href} className={s.row}>
              <div className={s.rowFrame}>
                <FillImage src={n.img} alt={n.imgAlt} sizes="(max-width: 760px) 100vw, 420px" />
              </div>
              <div className={s.rowBody}>
                <p className={s.rowMeta}>
                  <strong>{n.cat}</strong> · <time dateTime={n.date}>{n.dateLabel}</time>
                </p>
                <h3 className={s.rowTitle}>{n.title}</h3>
                <p className={s.rowExcerpt}>{n.excerpt}</p>
                <span className={s.rowCta}>Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={s.empty}>
          <p className={s.emptyTitle}>
            {catEmpty ? `No ${cat.toLowerCase()} published yet.` : `Nothing matches “${query}”.`}
          </p>
          <p className={s.emptyText}>
            {catEmpty
              ? 'When the club publishes official announcements and press releases, they will be listed here with their dates.'
              : 'Try a different word, or browse every story from the beginning of the journey.'}
          </p>
          <div className={s.emptyActions}>
            <button
              type="button"
              onClick={() => {
                setCat('All');
                setQuery('');
              }}
              className="btn btnLight"
            >
              SHOW ALL STORIES
            </button>
            <Link href="/fan-club#join" className="btn btnPrimary">
              GET ANNOUNCEMENTS FIRST
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
