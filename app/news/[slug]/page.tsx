import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Page from '@/components/Page';
import { FillImage } from '@/components/Media';
import ShareBar from '@/components/news/ShareBar';
import { CONFIG, getArticle, NEWS, type Block } from '@/lib/site';
import s from './article.module.css';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Story not found' };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      images: [article.img],
    },
  };
}

const readTime = (body: Block[]) => {
  const words = body.reduce((sum, [, text]) => sum + text.split(/\s+/).length, 0);
  return `${Math.max(1, Math.round(words / 220))} min read`;
};

function Prose({ body }: { body: Block[] }) {
  return (
    <>
      {body.map(([kind, text], i) => {
        switch (kind) {
          case 'lead':
            return (
              <p key={i} className={s.lead}>
                {text}
              </p>
            );
          case 'b':
            return (
              <p key={i} className={s.bold}>
                {text}
              </p>
            );
          case 'h':
            return (
              <h2 key={i} className={s.subhead}>
                {text}
              </h2>
            );
          case 'pull':
            return (
              <p key={i} className={s.pull}>
                {text}
              </p>
            );
          default:
            return (
              <p key={i} className={s.para}>
                {text}
              </p>
            );
        }
      })}
    </>
  );
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = NEWS.filter((n) => n.slug !== article.slug).slice(0, 3);
  const url = `${CONFIG.siteUrl}/news/${article.slug}`;

  return (
    <Page theme="white" active="news" solid>
      <article aria-labelledby="art-h">
        <header className={s.header}>
          <nav aria-label="Breadcrumb" className={s.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/news">News</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className={s.breadcrumbCurrent}>
              {article.title}
            </span>
          </nav>
          <p className={s.meta}>
            <Link href={`/news?cat=${encodeURIComponent(article.cat)}`} className={s.metaCat}>
              {article.cat}
            </Link>{' '}
            · <time dateTime={article.date}>{article.dateLabel}</time> · {readTime(article.body)}
          </p>
          <h1 id="art-h" className={s.title}>
            {article.title}
          </h1>
        </header>

        <div className={s.heroBand}>
          <figure className={s.heroFigure}>
            <FillImage src={article.img} alt={article.imgAlt} sizes="100vw" priority />
          </figure>
        </div>

        <div className={s.body}>
          <ShareBar url={url} title={article.title} />
          <div className={s.prose}>
            <Prose body={article.body} />
            <div className={s.endCta}>
              <p className={s.endCtaText}>Follow the journey from the first chapter.</p>
              <Link href="/fan-club#join" className="btn btnPrimary">
                BECOME A FAN
              </Link>
            </div>
          </div>
        </div>
      </article>

      <nav aria-label="More stories" className={s.related}>
        <div className={s.relatedHead}>
          <h2 className={`display ${s.relatedTitle}`}>Related stories</h2>
          <Link href="/news" className="linkRule">
            ← Back to all news
          </Link>
        </div>
        <div className={s.relatedGrid}>
          {related.map((n) => (
            <Link key={n.slug} href={n.href} className={s.relatedCard}>
              <div className={s.relatedFrame}>
                <FillImage src={n.img} alt={n.imgAlt} sizes="(max-width: 760px) 100vw, 33vw" />
              </div>
              <p className={s.relatedMeta}>
                <strong>{n.cat}</strong> · {n.dateLabel}
              </p>
              <h3 className={s.relatedName}>{n.title}</h3>
            </Link>
          ))}
        </div>
      </nav>
    </Page>
  );
}
