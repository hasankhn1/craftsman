/* Blue Phoenix FC — shared site config, content and helpers.
   Typed port of the original site.js. Edit CONFIG to go live. */

const U = 'https://bluephoenixfc.com/wp-content/uploads/';

export const CONFIG = {
  /** Season-launch target. Official first-match date not yet announced — update when confirmed. */
  kickoff: '2027-09-01T00:00:00+04:00',
  kickoffConfirmed: false,
  /** First published BPFC Journey story. */
  journeyStart: '2026-09-15T00:00:00+04:00',
  /** Form service accepting a JSON POST (Formspree / Basin / own API). Empty = not connected. */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '',
  siteUrl: 'https://bluephoenixfc.com',
} as const;

export const IMG = {
  crest: `${U}2026/09/BluePhoenixFCLogo.png`,
  fans: `${U}2026/01/SSE_Concert-Background-1024x683.jpg`,
  ground: `${U}2026/09/BackGround-1024x576.jpeg`,
  identity: `${U}2026/09/img_3966.jpeg`,
  begins: `${U}2026/09/94c174b6-b6d1-4e3c-823f-884fe990a881-1024x576.jpeg`,
} as const;

/* Media bundled with the project. Each entry keeps a remote fallback so the
   site renders correctly even before the binaries are copied into /public. */
export const MEDIA = {
  heroVideo: '/media/hero.mp4',
  firstWhistle: { src: '/media/first-whistle.webp', fallback: IMG.ground },
  journeyPitch: { src: '/media/journey-pitch.png', fallback: IMG.begins },
  journeyPhoenix: { src: '/media/journey-phoenix.png', fallback: IMG.identity },
  stadium: { src: '/media/stadium.webp', fallback: IMG.fans },
} as const;

export type Social = { name: string; url: string };

export const SOCIALS: Social[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/bluephoenixfc' },
  { name: 'X', url: 'https://x.com/BluePhoenixFC' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/blue-phoenix-fc' },
  { name: 'Facebook', url: 'https://www.facebook.com/BluePhoenixFootballClub/' },
  { name: 'Threads', url: 'https://www.threads.com/@bluephoenixfc' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@BluePhoenix.FC' },
  { name: 'YouTube', url: 'https://www.youtube.com/@BluePhoenixFC' },
];

export type Person = {
  name: string;
  role: string;
  img: string;
  ig: string;
  li: string;
};

export const TEAM: Person[] = [
  {
    name: 'Suleyman D. Khan',
    role: 'Co-Founder & Chief Executive Officer',
    img: `${U}2026/09/0fab87a3-8de7-4c6d-8cb3-e359e66b0ae4-819x1024.jpeg`,
    ig: 'https://www.instagram.com/suleymandkhan',
    li: 'https://www.linkedin.com/in/suleyman-d-khan/',
  },
  {
    name: 'Hossama D. Khan',
    role: 'Co-Founder & Chief Operating Officer',
    img: `${U}2026/09/fd890be2-694d-4a9c-aaae-4a600c4dc9bf-819x1024.jpeg`,
    ig: 'https://www.instagram.com/hossama.khan/',
    li: 'https://www.linkedin.com/in/hossama-khan/',
  },
  {
    name: 'Uzeel Ur Rehman',
    role: 'Co-Founder & Chief Growth Officer',
    img: `${U}2026/09/d258ae9c-54f3-4d21-9c82-cea4d287500b-819x1024.jpeg`,
    ig: 'https://www.instagram.com/uzeel.u.r/',
    li: 'https://www.linkedin.com/in/uzeelurrehman/',
  },
  {
    name: 'Muhammed Ansab',
    role: 'Sr. Director Operations & Research',
    img: `${U}2026/09/b8ba995c-8e8c-43c3-994b-d89b9a09473f-819x1024.jpeg`,
    ig: 'https://www.instagram.com/ansab.7',
    li: 'https://www.linkedin.com/in/muhammadansab/',
  },
  {
    name: 'Amaan Shad',
    role: 'Director Marketing',
    img: `${U}2026/09/b558f383-a2c0-4e55-8467-face6b85fa2c-819x1024.jpeg`,
    ig: 'https://www.instagram.com/amaanshad_/',
    li: 'https://www.linkedin.com/in/amaanshad/',
  },
];

/** Article body blocks: p | b (bold line) | h (subhead) | lead (standfirst) | pull (pull line) */
export type BlockKind = 'p' | 'b' | 'h' | 'lead' | 'pull';
export type Block = [BlockKind, string];

export type Article = {
  slug: string;
  title: string;
  cat: string;
  date: string;
  img: string;
  imgAlt: string;
  excerpt: string;
  body: Block[];
  /** Derived */
  href: string;
  dateLabel: string;
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Deterministic en-GB long date ("15 September 2026") — locale-independent so
 *  server and client render identically. */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

const RAW_NEWS: Omit<Article, 'href' | 'dateLabel'>[] = [
  {
    slug: 'the-fans-before-the-first-whistle',
    title: 'The Fans: Before the First Whistle',
    cat: 'BPFC Journey',
    date: '2026-09-15',
    img: IMG.fans,
    imgAlt: 'A crowd lit in red at a concert, hands raised',
    excerpt:
      'You don’t have to wait for the first match to become part of the club. The people who join now won’t simply be fans of an established club — they will be part of its beginning.',
    body: [
      ['lead', 'You don’t have to wait for the first match to become part of the club.'],
      ['p', 'Most football clubs introduce their supporters on matchday.'],
      ['p', 'We want Blue Phoenix supporters to be there much earlier.'],
      ['p', 'Because the people who join us now won’t simply be fans of an established club.'],
      ['pull', 'They will be part of its beginning.'],
      [
        'p',
        'They will remember when the website first launched. When the first player was announced. When the first shirt was revealed. When the first training session happened. When the countdown finally reached zero.',
      ],
      [
        'p',
        'They will remember the first goal. The first victory. The first time thousands of people stood together behind the Phoenix.',
      ],
      ['p', 'That is what makes building a club from the ground up so powerful.'],
      ['p', 'The supporters don’t just inherit history.'],
      ['b', 'They help create it.'],
      [
        'p',
        'Blue Phoenix FC wants to build a community that extends beyond the stadium — through digital experiences, grassroots initiatives, youth engagement, content and opportunities for fans to participate in the story.',
      ],
      ['p', 'Because football belongs to everyone. And a club without its people is only a badge.'],
      ['p', 'So if you’re joining us now, you’re not early.'],
      ['pull', 'You’re exactly where you should be.'],
      ['p', 'Welcome to the beginning.'],
      ['b', 'Be Blue. Be Phoenix. Together, We Rise.'],
    ],
  },
  {
    slug: 'building-from-the-ground-up',
    title: 'Building From the Ground Up',
    cat: 'BPFC Journey',
    date: '2026-09-15',
    img: IMG.ground,
    imgAlt: 'Blue Phoenix FC background artwork',
    excerpt:
      'The work nobody sees is what builds the club everyone eventually sees. Clubs are built long before the first whistle — in planning, recruitment, strategy and preparation.',
    body: [
      ['lead', 'The work nobody sees is what builds the club everyone eventually sees.'],
      ['p', 'Football makes the headlines on matchday.'],
      ['p', 'But football clubs are built long before the first whistle.'],
      [
        'p',
        'They are built in planning meetings, training grounds, recruitment decisions, strategy sessions, conversations with partners and countless hours spent preparing for a future that doesn’t exist yet.',
      ],
      ['p', 'That is where Blue Phoenix FC is today.'],
      ['pull', 'Building.'],
      ['p', 'We are approaching the creation of the club with a long-term mindset.'],
      ['p', 'The objective is not simply to assemble a team for one season.'],
      [
        'p',
        'It is to establish the foundations of a sustainable football organisation — from players and coaching to operations, commercial development, media, technology and fan engagement.',
      ],
      [
        'p',
        'Every foundation matters. Because if the ambition is to climb, the foundations have to be strong enough to carry the weight of that ambition.',
      ],
      [
        'p',
        'The UAE football landscape presents an exciting opportunity for a new generation of clubs to think differently. Blue Phoenix intends to embrace that opportunity.',
      ],
      [
        'p',
        'We want to build a club that understands modern football while respecting everything that makes the game special.',
      ],
      ['p', 'The badge may be new. The ambition is not.'],
      ['b', 'The work starts now.'],
    ],
  },
  {
    slug: 'why-blue-phoenix',
    title: 'Why Blue Phoenix?',
    cat: 'BPFC Journey',
    date: '2026-09-15',
    img: IMG.identity,
    imgAlt: 'Blue Phoenix FC identity imagery',
    excerpt:
      'A name. A symbol. A statement of intent. Blue represents our identity; the Phoenix represents our spirit.',
    body: [
      ['lead', 'A name. A symbol. A statement of intent.'],
      [
        'p',
        'A football club needs more than a name. It needs an identity. Something people can recognise, wear, defend and believe in.',
      ],
      ['p', 'Blue Phoenix was chosen because it represents two powerful ideas.'],
      ['p', 'Blue represents our identity — confidence, ambition, trust and belonging.'],
      [
        'p',
        'The Phoenix represents our spirit — resilience, transformation and the ability to rise again, stronger than before.',
      ],
      ['p', 'Together, they represent the mentality we want to build into every part of the club.'],
      [
        'p',
        'We don’t want Blue Phoenix FC to simply be recognised by a badge. We want people to recognise what that badge stands for.',
      ],
      [
        'p',
        'For the player, it represents opportunity. For the supporter, it represents belonging. For the young fan dreaming of playing football, it represents possibility. For the people building the club, it represents responsibility.',
      ],
      ['p', 'Because when you wear the Phoenix, you are not simply wearing a shirt.'],
      ['pull', 'You are carrying the story forward.'],
      ['p', 'And that story is only beginning.'],
      ['b', 'Be Blue. Be Phoenix.'],
    ],
  },
  {
    slug: 'blue-phoenix-fc-the-journey-begins',
    title: 'Blue Phoenix FC: The Journey Begins',
    cat: 'BPFC Journey',
    date: '2026-09-15',
    img: IMG.begins,
    imgAlt: 'Blue Phoenix FC — the journey begins',
    excerpt:
      'The first chapter of a new football story is being written in the UAE — with the objective of competing in the UAE Third Division in the 2027/28 season.',
    body: [
      ['lead', 'The first chapter of a new football story is being written in the UAE.'],
      [
        'p',
        'Every football club has a beginning. Long before the first match, the first goal, the first victory or the first trophy, there is an idea — a belief that something worth building can become something real.',
      ],
      ['p', 'For Blue Phoenix FC, that moment is now.'],
      [
        'p',
        'Blue Phoenix FC is being built from the ground up with a clear ambition: to create a modern football club with a strong identity, a genuine connection with its fans and a long-term vision for the future of the game.',
      ],
      [
        'p',
        'The immediate objective is to work towards competing in the UAE Third Division in the 2027/28 season. But the ambition extends far beyond a single season or a single competition. The goal is to build a club capable of growing through the levels of UAE football while developing players, creating opportunities and establishing a community around the badge.',
      ],
      [
        'p',
        'What makes this journey different is that supporters have the opportunity to experience it from the very beginning.',
      ],
      [
        'p',
        'There are no historic trophies to celebrate yet. No legendary matches have been played. No great nights have been written into the club’s history.',
      ],
      ['pull', 'And that is precisely the point.'],
      [
        'p',
        'The history is waiting to be written. The first player to wear the shirt. The first training session. The first goal. The first match. The first victory. The first supporters standing behind the team.',
      ],
      [
        'p',
        'These are the moments that eventually become the stories every football club tells for generations.',
      ],
      ['h', 'More than ninety minutes'],
      [
        'p',
        'At the heart of Blue Phoenix FC is a simple belief that a football club should be about more than what happens for 90 minutes on a pitch. It should be about people, opportunity, ambition and belonging.',
      ],
      [
        'p',
        'It should give young players something to aspire to, supporters something to believe in and a community something to be proud of.',
      ],
      [
        'p',
        'The Phoenix represents that spirit. It represents the willingness to rise, to rebuild, to keep moving forward and to become stronger with every challenge.',
      ],
      ['b', 'Blue is the identity. Phoenix is the spirit. Football is the game.'],
      ['p', 'Together, they form Blue Phoenix FC.'],
      ['h', 'The road to September 2027'],
      [
        'p',
        'The road to September 2027 has already begun. There will be challenges along the way, but every great football story has them. The difference is what happens when you face them.',
      ],
      [
        'p',
        'For Blue Phoenix FC, the ambition is clear: start at the ground, build the foundations, earn every step and rise.',
      ],
      [
        'p',
        'And when the first whistle eventually blows, it won’t simply mark the beginning of a football season. It will mark the beginning of a story.',
      ],
      [
        'pull',
        'A story that supporters can say they were there for from the very first chapter.',
      ],
      ['b', 'This is Blue. This is Phoenix. This is football. The journey starts now.'],
    ],
  },
];

export const NEWS: Article[] = RAW_NEWS.map((n) => ({
  ...n,
  href: `/news/${n.slug}`,
  dateLabel: fmtDate(n.date),
}));

export const FEATURED_SLUG = 'blue-phoenix-fc-the-journey-begins';

export function getFeatured(): Article {
  return NEWS.find((n) => n.slug === FEATURED_SLUG) ?? NEWS[0];
}

export function getArticle(slug: string): Article | undefined {
  return NEWS.find((n) => n.slug === slug);
}

export const CATEGORIES = ['All', 'BPFC Journey', 'Club Announcements', 'Press Releases'];

/* ---------------- Countdown & road progress ---------------- */

export type Countdown = {
  passed: boolean;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export function countdown(now = Date.now()): Countdown {
  const diff = new Date(CONFIG.kickoff).getTime() - now;
  if (diff <= 0) return { passed: true, days: '0', hours: '00', minutes: '00', seconds: '00' };
  const s = Math.floor(diff / 1000);
  return {
    passed: false,
    days: String(Math.floor(s / 86400)),
    hours: pad(Math.floor(s / 3600) % 24),
    minutes: pad(Math.floor(s / 60) % 60),
    seconds: pad(s % 60),
  };
}

export type RoadProgress = {
  pct: number;
  pctLabel: string;
  daysIn: number;
  today: string;
};

export function roadProgress(now = Date.now()): RoadProgress {
  const a = new Date(CONFIG.journeyStart).getTime();
  const b = new Date(CONFIG.kickoff).getTime();
  const pct = Math.max(0, Math.min(1, (now - a) / (b - a)));
  const d = new Date(now);
  return {
    pct,
    pctLabel: `${Math.round(pct * 100)}%`,
    daysIn: Math.max(0, Math.floor((now - a) / 86400000)),
    today: `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
  };
}

/* ---------------- Form submission ---------------- */

export type SubmitResult = { ok: boolean; connected: boolean };

/** Honest submission: posts to CONFIG.formEndpoint if set; otherwise reports
 *  "not connected" and keeps the payload in localStorage for preview builds. */
export async function submitForm(
  form: string,
  data: Record<string, unknown>,
): Promise<SubmitResult> {
  const payload = { form, submittedAt: new Date().toISOString(), ...data };

  if (!CONFIG.formEndpoint) {
    try {
      const k = 'bpfc-preview-submissions';
      const arr = JSON.parse(localStorage.getItem(k) || '[]');
      arr.push(payload);
      localStorage.setItem(k, JSON.stringify(arr));
    } catch {
      /* storage unavailable — preview only, nothing to recover */
    }
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, connected: false };
  }

  try {
    const r = await fetch(CONFIG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    return { ok: r.ok, connected: true };
  } catch {
    return { ok: false, connected: true };
  }
}

/* ---------------- Navigation ---------------- */

export type NavId = 'home' | 'journey' | 'club' | 'team' | 'news' | 'register' | 'fan' | 'none';

export const NAV_ITEMS: { id: NavId; label: string; href: string }[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'journey', label: 'Our Journey', href: '/our-journey' },
  { id: 'club', label: 'The Club', href: '/the-club' },
  { id: 'team', label: 'Team', href: '/team' },
  { id: 'news', label: 'News', href: '/news' },
  { id: 'register', label: 'Register', href: '/register' },
  { id: 'fan', label: 'Be a Fan', href: '/fan-club' },
];
