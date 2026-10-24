import Link from 'next/link';
import Page from '@/components/Page';
import s from './article.module.css';

export default function ArticleNotFound() {
  return (
    <Page theme="white" active="news" solid>
      <section className={s.missing}>
        <h1 className={`display ${s.missingTitle}`}>Story not found.</h1>
        <p className={s.missingText}>
          This article may have moved. Every published story is on the news page.
        </p>
        <Link href="/news" className="btn btnPrimary" style={{ marginTop: 32 }}>
          BACK TO NEWS
        </Link>
      </section>
    </Page>
  );
}
