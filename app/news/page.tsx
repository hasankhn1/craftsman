import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import Page from '@/components/Page';
import { FillImage } from '@/components/Media';
import NewsList from '@/components/news/NewsList';
import { getFeatured } from '@/lib/site';
import s from './news.module.css';

export const metadata: Metadata = {
  title: 'News & Press',
  description:
    'BPFC Journey stories, club announcements and press releases from Blue Phoenix FC.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'News & Press — Blue Phoenix FC',
    description: 'Follow the building of Blue Phoenix FC, story by story.',
  },
};

export default function NewsPage() {
  const feature = getFeatured();

  return (
    <Page theme="paper" active="news" solid>
      <section aria-labelledby="news-h" className={s.hero}>
        <h1 id="news-h" className={`display ${s.heroTitle}`}>
          News &amp; press
        </h1>

        <Link href={feature.href} className={s.feature}>
          <div className={s.featureFrame}>
            <FillImage
              src={feature.img}
              alt={feature.imgAlt}
              sizes="(max-width: 980px) 100vw, 50vw"
              priority
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <p className={s.featureMeta}>
              <strong>Featured · {feature.cat}</strong> ·{' '}
              <time dateTime={feature.date}>{feature.dateLabel}</time>
            </p>
            <h2 className={s.featureTitle}>{feature.title}</h2>
            <p className={s.featureExcerpt}>{feature.excerpt}</p>
            <span className={s.featureCta}>Read article →</span>
          </div>
        </Link>
      </section>

      <Suspense fallback={null}>
        <NewsList />
      </Suspense>
    </Page>
  );
}
