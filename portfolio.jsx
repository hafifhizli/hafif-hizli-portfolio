/* Shared components — all viewports import this.
   IIFE-attaches everything to window so other Babel scripts can use them. */

const { useState, useEffect, useRef, useMemo } = React;

/* ----------------------------- Custom cursor ----------------------------- */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hot, setHot] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return; // skip on touch
    let x = innerWidth/2, y = innerHeight/2, rx = x, ry = y;
    let raf;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x-4}px, ${y-4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx-16}px, ${ry-16}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onOver = (e) => {
      const el = e.target.closest('a, button, .hot-area, input, textarea, [data-cursor="hot"]');
      setHot(!!el);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.body.classList.add('cursor-hidden');
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.classList.remove('cursor-hidden');
    };
  }, []);
  return (
    <>
      <div ref={ringRef} className={`cursor-ring ${hot ? 'hot' : ''}`} />
      <div ref={dotRef}  className={`cursor-dot  ${hot ? 'hot' : ''}`} />
    </>
  );
}

/* ----------------------------- Logo lockup ----------------------------- */
function Logo({ onDark = false }) {
  return (
    <a href="#top" className="logo" aria-label="Izzy — Hafif Hizli">
      <img src="assets/orange.png" alt="" className="logo-dot" />
      <div>
        <div className="logo-name" style={{color: onDark ? '#F2F0E2' : '#272420'}}>
          IZZY<span style={{color: '#BD4F4F'}}>.</span>
        </div>
        <div className="logo-meta">Hafif Hizli · Web Dev</div>
      </div>
    </a>
  );
}

/* ----------------------------- Header (floating glass-ish bar) ---------- */
function Header({ items, ctaLabel = 'Hire Me' }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, {passive:true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-header-inner">
        <Logo onDark={!scrolled} />
        <nav className="site-nav">
          {items.map((it) => (
            <a key={it.href} href={it.href}>
              <span className="num">{it.num}</span>{it.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary btn-sm">{ctaLabel} →</a>
      </div>
    </header>
  );
}

/* ----------------------------- Hero ----------------------------- */
function Hero() {
  const portraitRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const onMove = (e) => {
      if (!portraitRef.current) return;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      portraitRef.current.style.transform = `translate(calc(-50% + ${x}px), ${y}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <section className="hero" id="top">
      <div className="aurora" />
      <div className="grain" />
      <div className="hero-eyebrow-row">
        <span className="eyebrow"><span className="num">01</span> — Web Developer · Medan, ID</span>
        <span className="eyebrow"><span className="num">{new Date().getFullYear()}</span> — Portfolio v3</span>
      </div>

      <div className="hero-name">
        <span className="glitch" data-text="HAFIF">HAFIF</span>
        <br />
        <span className="glitch" data-text="HIZLI.">HIZLI<span className="acc">.</span></span>
      </div>

      <div ref={portraitRef} className="hero-portrait">
        <img src="assets/izzy.webp" alt="Portrait of Hafif Hizli" />
      </div>

      <div className="hero-sub">
        <p>
          <em>I'm Izzy</em> — Information Systems Engineer building fast, secure,
          robust web. Front-end pixel work to back-end Laravel &amp; WordPress.
          <br />Malikussaleh University · GPA 3.79/4.00.
        </p>
        <div className="hero-cta-row">
          <a href="#work" className="btn btn-primary">See Projects →</a>
          <a href="#contact" className="btn btn-on-dark">Mari ngobrol</a>
        </div>
      </div>

      <div className="hero-stat-card">
        <div className="num">95+</div>
        <div className="lab">PageSpeed Insights<br/>from 65 — sustained</div>
      </div>

      <div className="hero-bottom-bar">
        <span>scroll ↓</span>
        <span>connecting · Medan ⇄ Global</span>
      </div>
    </section>
  );
}

/* ----------------------------- Section header ----------------------------- */
function SectionHead({ num, en, id, kanji }) {
  return (
    <div className="section-head">
      <span className="eyebrow"><span className="num">// {num}</span> — {id} / {en}</span>
      <h2 className="display-lg">{en}</h2>
      {kanji && <div className="section-kanji">{kanji}</div>}
    </div>
  );
}

/* ----------------------------- About ----------------------------- */
function About() {
  return (
    <section className="about" id="about">
      <SectionHead num="01" en="About" id="Tentang" kanji="自己" />
      <div className="about-grid">
        <div>
          <p className="lead">
            Welcome to my website. I'm an Information Systems Engineering
            graduate from <strong>Malikussaleh University</strong>,
            building production web for the global commodity export sector
            since 2023.
          </p>
        </div>
        <div className="about-body">
          <p>
            Day-to-day, I manage the digital infrastructure for a leading
            coffee commodity exporter — custom WordPress &amp; plugin
            development, Core Web Vitals work, technical SEO, and the boring
            but vital business of keeping it secure and online.
          </p>
          <p>
            I lean back-end (PHP 8 / Laravel) but I do front-end too. I write
            documentation. I collaborate with marketing and design. I read the
            error logs.
          </p>
          <p>
            Based in <strong>Medan, North Sumatera</strong>. Working remote /
            hybrid with teams anywhere.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Skills ----------------------------- */
const SKILL_GROUPS = [
  { num: '01', label: 'CMS & Dev',     items: ['WordPress · Custom themes', 'Custom plugins', 'WooCommerce', 'Elementor Pro', 'Gutenberg blocks'] },
  { num: '02', label: 'Languages',     items: ['PHP 8.x', 'JavaScript (ES6+)', 'Laravel 9', 'HTML5 · CSS3', 'SQL · MySQL'] },
  { num: '03', label: 'Performance',   items: ['Core Web Vitals (LCP/CLS/INP)', 'WP Rocket · LiteSpeed', 'Image optimization', 'Schema markup', 'GA4 · Search Console'] },
  { num: '04', label: 'Ops & Sec',     items: ['Git / GitHub', 'cPanel / WHM', 'Wordfence · SSL', 'CompTIA Security+', 'Agile · Documentation'] }
];
function Skills() {
  return (
    <section className="skills" id="skills">
      <SectionHead num="02" en="Skills" id="Keahlian" kanji="技術" />
      <div className="skills-grid">
        {SKILL_GROUPS.map(g => (
          <div className="skill-block" key={g.num}>
            <div className="skill-head">
              <span className="num">{g.num}</span>
              <span className="lab">{g.label}</span>
            </div>
            <ul>
              {g.items.map((it, i) => (
                <li key={i}><span className="b">→</span>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Work / Projects ----------------------------- */
const PROJECTS = [
  {
    num: '01',
    year: '2023—Present',
    title: 'PT FnB Tech Indonesia',
    role: 'Web Developer · Remote',
    desc: 'End-to-end WordPress for a leading Indonesian coffee commodity exporter. Custom plugins sync warehouse inventory with the front-end. PageSpeed 65 → 95+, +30% organic traffic from USA & EU markets, 99.9% uptime.',
    stack: ['WordPress', 'PHP 8', 'WooCommerce', 'Elementor', 'Wordfence'],
    metrics: [['65→95+', 'PageSpeed'], ['+30%', 'Organic traffic'], ['99.9%', 'Uptime']]
  },
  {
    num: '02',
    year: '2022—2023',
    title: 'VR Tour Platform',
    role: 'Lead Developer · Malikussaleh Univ.',
    desc: 'Immersive 360° web tour for the Faculty of Engineering. Built in Laravel 9 with Three.js panoramic rendering. Attracted 10,000+ unique visitors and reshaped how the faculty showcases its campus to prospective students.',
    stack: ['Laravel 9', 'Three.js', 'MySQL', 'Bootstrap'],
    metrics: [['10K+', 'Visitors'], ['360°', 'Panoramic'], ['1', 'Faculty']]
  },
  {
    num: '03',
    year: '2021—2022',
    title: 'E-Marketplace for SMEs',
    role: 'Web Developer · MUI Economic Congress',
    desc: 'Multi-vendor marketplace to support small businesses during the pandemic. Secure authentication, product management, and an occlusion-based optimization for 3D asset rendering on the web.',
    stack: ['PHP', 'Laravel', 'MySQL', 'Auth'],
    metrics: [['Multi', 'Vendor'], ['Occlusion', '3D optimization'], ['Secure', 'Auth']]
  }
];
function Work() {
  return (
    <section className="work" id="work">
      <SectionHead num="03" en="Selected Work" id="Karya Terpilih" kanji="仕事" />
      <div className="work-list">
        {PROJECTS.map((p, i) => (
          <article className={`project ${i % 2 ? 'project--alt' : ''}`} key={p.num}>
            <div className="project-meta">
              <div className="project-num">{p.num}</div>
              <div className="project-year">{p.year}</div>
            </div>
            <div className="project-body">
              <h3 className="project-title">{p.title}</h3>
              <div className="project-role">{p.role}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map(s => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
            <div className="project-metrics">
              {p.metrics.map(([n, l], j) => (
                <div key={j} className="pm">
                  <div className="pm-num">{n}</div>
                  <div className="pm-lab">{l}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Experience timeline ----------------------------- */
const TIMELINE = [
  { year: '2023—Now', title: 'Web Developer · PT FnB Tech Indonesia', body: 'Custom WordPress development, performance engineering, technical SEO. Coffee commodity export.' },
  { year: '2024', title: 'CompTIA Security+ (SY0-701) Practice', body: 'Cybersecurity fundamentals, secure web architecture for fintech.' },
  { year: '2022—2023', title: 'Lead Developer · VR Tour Platform', body: 'Laravel 9, Three.js, 360° panoramic web tour. 10K+ unique visitors.' },
  { year: '2021—2022', title: 'Web Developer · E-Marketplace for SMEs', body: 'Multi-vendor platform during the pandemic, secure authentication.' },
  { year: '2020', title: 'Python for Data Science · Sanbercode', body: 'Bootcamp. Pandas, scikit-learn, basic ML.' },
  { year: '2018—2023', title: 'B.Eng. Information Systems · Malikussaleh University', body: 'GPA 3.79/4.00. Advanced Web Programming, IT Project Management, System Analysis.' }
];
function Experience() {
  return (
    <section className="experience" id="experience">
      <SectionHead num="04" en="Experience" id="Pengalaman" kanji="経歴" />
      <ol className="timeline">
        {TIMELINE.map((t, i) => (
          <li key={i}>
            <div className="t-year">{t.year}</div>
            <div className="t-body">
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
            <div className="t-mark" aria-hidden="true">{String(i+1).padStart(2,'0')}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ----------------------------- Contact ----------------------------- */
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="aurora aurora--soft" />
      <div className="grain" />
      <div className="contact-inner">
        <SectionHead num="05" en="Let's build something" id="Mari ngobrol" kanji="連絡" onDark />
        <div className="contact-grid">
          <form className="contact-form" onSubmit={(e)=>e.preventDefault()}>
            <div className="row-2">
              <div><label>// Nama / Name</label><input placeholder="Your name" /></div>
              <div><label>// Email</label><input type="email" placeholder="you@company.com" /></div>
            </div>
            <div><label>// Pesan / Message</label><textarea rows="4" placeholder="What are we building together?"></textarea></div>
            <div className="contact-actions">
              <button className="btn btn-primary" type="submit">Send →</button>
              <span className="micro">Reply in &lt; 24 hours</span>
            </div>
          </form>
          <aside className="contact-aside">
            <div className="seal">至</div>
            <div className="contact-direct">
              <div><span className="micro">// email</span><a href="mailto:hafifhizli@gmail.com">hafifhizli@gmail.com</a></div>
              <div><span className="micro">// phone</span><a href="tel:+6281363901524">+62 813-6390-1524</a></div>
              <div><span className="micro">// location</span><span>Medan, North Sumatera</span></div>
            </div>
            <div className="contact-social">
              <a href="#" aria-label="LinkedIn"><img src="assets/linkedin.png" alt="" /></a>
              <a href="#" aria-label="Instagram"><img src="assets/instagram.png" alt="" /></a>
              <a href="#" aria-label="Twitter"><img src="assets/twitter.png" alt="" /></a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Footer ----------------------------- */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-name">HAFIF HIZLI<span style={{color:'#BD4F4F'}}>.</span></div>
          <p className="micro">Dibangun sendiri di Medan, North Sumatera.<br/>© 2026 Hafif Hizli — all rights reserved.</p>
        </div>
        <div className="footer-col">
          <span className="micro">// sitemap</span>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-col">
          <span className="micro">// elsewhere</span>
          <a href="#">LinkedIn ↗</a>
          <a href="#">GitHub ↗</a>
          <a href="#">Instagram ↗</a>
          <a href="#">Twitter / X ↗</a>
        </div>
        <div className="footer-col">
          <span className="micro">// status</span>
          <div className="status"><span className="dot" />Available for select work — 2026 Q3+</div>
          <p className="micro" style={{marginTop:8}}>Last updated · May 2026</p>
        </div>
      </div>
    </footer>
  );
}

/* Expose to global */
Object.assign(window, { CustomCursor, Logo, Header, Hero, SectionHead, About, Skills, Work, Experience, Contact, Footer });
