/* Bilingual portfolio + liquid glass music player + glass accents */
const { useState, useEffect, useRef } = React;

/* ============================ i18n strings ============================ */
const T = {
  en: {
    navAvailable: 'Available · 2026 Q3+',
    nav: [
      { num: '01', label: 'About',          href: '#about' },
      { num: '02', label: 'Skills',         href: '#skills' },
      { num: '03', label: 'Experience',     href: '#experience' },
      { num: '04', label: 'Projects',       href: '#work' },
      { num: '05', label: 'Certifications', href: '#certifications' },
      { num: '06', label: 'Contact',        href: '#contact' },
    ],
    ctaHire: 'Hire Me',
    heroEyebrow: 'Web Developer · Medan, ID',
    portfolioV: 'Portfolio v3',
    heroSub: <>I'm Izzy — Information Systems graduate (GPA 3.79/4.00) with hands-on experience in Laravel, PHP, JavaScript, WordPress, and SEO. I build responsive, secure web — and I read the error logs.</>,
    seeProjects: 'See Projects →',
    letsChat: "Let's chat",
    heroStat: 'Full-Stack',
    heroStatLine1: 'PHP · Laravel · WP',
    heroStatLine2: 'SEO · Core Web Vitals',
    scroll: 'scroll ↓',
    connecting: 'connecting · Medan ⇄ Global',
    nowPlaying: 'Now playing',
    musicTitle: '青のすみか',
    musicArtist: 'Kitani Tatsuya · 呪術廻戦 OP',
    // About
    aboutEyebrow: 'About / Tentang',
    aboutHead: 'About',
    aboutLead: <>Welcome. I'm an Information Systems graduate from <strong>Malikussaleh University</strong> (GPA 3.79/4.00) — a <strong>System Analyst candidate</strong> bridging business stakeholders and technical teams.</>,
    aboutP1: <>2+ years translating business requirements into effective technical solutions. I gather user requirements, design solution concepts, produce structured documentation (flows, modules, specs), and ship end-to-end with <strong>PHP, Laravel, JavaScript, MySQL, and WordPress</strong>.</>,
    aboutP2: <>Proven results in system optimization — <strong>99.9% uptime</strong>, <strong>PageSpeed 95+</strong>, and a <strong>+30% lift in organic traffic</strong> from key export markets via schema markup and technical SEO.</>,
    aboutP3: <>AI-augmented workflow with <strong>Claude, Claude Code, Claude Design, Gemini, and ChatGPT</strong> — used daily to accelerate requirements clarification, documentation drafting, and problem-solving. Based in <strong>Medan, Sumatera Utara</strong> — open to remote / hybrid system analyst and web development roles.</>,
    // Skills
    skillsEyebrow: 'Skills / Keahlian',
    skillsHead: 'Skills',
    skills: [
      { num: '01', label: 'System Analysis', icon: 'analysis', kanji: '分析', items: [
        { icon: 'lucide:clipboard-list',          text: 'Requirements gathering' },
        { icon: 'lucide:git-branch',              text: 'User flow & use case mapping' },
        { icon: 'lucide:workflow',                text: 'BPMN · Flowcharts' },
        { icon: 'lucide:file-text',               text: 'Technical specifications' },
        { icon: 'lucide:check-square',            text: 'System testing & UAT' },
      ]},
      { num: '02', label: 'Languages',   icon: 'code', kanji: '言語', items: [
        { icon: 'simple-icons:php',               text: 'PHP 8.x' },
        { icon: 'simple-icons:javascript',        text: 'JavaScript (ES6+)' },
        { icon: 'simple-icons:laravel',           text: 'Laravel 9' },
        { icon: 'simple-icons:html5',             text: 'HTML5 · CSS3' },
        { icon: 'simple-icons:mysql',             text: 'SQL · MySQL' },
      ]},
      { num: '03', label: 'CMS & Platforms', icon: 'cms', kanji: '設計', items: [
        { icon: 'simple-icons:wordpress',         text: 'WordPress · Custom themes' },
        { icon: 'lucide:puzzle',                  text: 'Custom plugins' },
        { icon: 'simple-icons:woocommerce',       text: 'WooCommerce' },
        { icon: 'simple-icons:elementor',         text: 'Elementor Pro' },
        { icon: 'lucide:blocks',                  text: 'Gutenberg blocks' },
      ]},
      { num: '04', label: 'Performance & SEO', icon: 'bolt', kanji: '速度', items: [
        { icon: 'lucide:gauge',                   text: 'Core Web Vitals (LCP/CLS/INP)' },
        { icon: 'lucide:rocket',                  text: 'WP Rocket · LiteSpeed' },
        { icon: 'lucide:braces',                  text: 'Schema markup' },
        { icon: 'simple-icons:googleanalytics',   text: 'GA4 · Search Console' },
        { icon: 'lucide:search',                  text: 'On-page SEO' },
      ]},
      { num: '05', label: 'AI Workflow', icon: 'ai',   kanji: '知能', items: [
        { icon: 'simple-icons:anthropic',         text: 'Claude · Claude Code' },
        { icon: 'lucide:palette',                 text: 'Claude Design' },
        { icon: 'simple-icons:googlegemini',      text: 'Gemini AI' },
        { icon: 'simple-icons:openai',            text: 'ChatGPT' },
        { icon: 'lucide:wand-sparkles',           text: 'AI-assisted analysis' },
      ]},
      { num: '06', label: 'Ops & Security', icon: 'lock', kanji: '安全', items: [
        { icon: 'simple-icons:github',            text: 'Git / GitHub' },
        { icon: 'simple-icons:cpanel',            text: 'cPanel / WHM' },
        { icon: 'lucide:shield-check',            text: 'Wordfence · SSL' },
        { icon: 'lucide:badge-check',             text: 'CompTIA Security+' },
        { icon: 'lucide:file-text',               text: 'Agile · Documentation' },
      ]},
    ],
    // Work
    workEyebrow: 'Selected Work / Karya Terpilih',
    workHead: 'Selected Work',
    projects: [
      { num: '01', year: '2023—Now', title: 'AEKI Web Platform (aeki-aice.org)', role: 'Web Developer · Asosiasi Eksportir Kopi Indonesia',
        desc: 'Built and maintained the national coffee exporters association website — member listings, news/announcements, and event management modules in WordPress. Ongoing performance tuning, technical SEO, and content workflow support grew organic reach to 55,000+ monthly visitors, serving Indonesian exporters and global B2B coffee buyers.',
        stack: ['WordPress', 'PHP', 'Technical SEO', 'Performance'],
        metrics: [['55K+', 'Monthly traffic'], ['2+', 'Years live'], ['99.9%', 'Uptime']],
        url: 'https://aeki-aice.org/', urlLabel: 'Visit AEKI website' },
      { num: '02', year: '2022—2023', title: 'VR Tour Creation', role: 'Lead Developer · Malikussaleh University',
        desc: 'Immersive 360° web tour featuring the Faculty of Engineering. Built in Laravel 9 with PHP, JavaScript, and HTML for interactivity. Image pipeline used Adobe Photoshop, 3D Stitcher, Google Street View, and 3D Vista. Attracted 1,000+ visitors and reshaped how the faculty showcases its campus.',
        stack: ['Laravel 9', 'PHP', 'JavaScript', '3D Vista', 'SEO'],
        metrics: [['1K+', 'Visitors'], ['360°', 'Panoramic'], ['1', 'Faculty']],
        url: 'https://sisteminformasi.unimal.ac.id/vr-tour/', urlLabel: 'View VR tour' },
      { num: '03', year: '2021—2022', title: 'E-Marketplace for SMEs', role: 'Web Developer · MUI Economic Congress (Umat II)',
        desc: 'Responsive, secure marketplace to support small businesses, built with Laravel 9. Added a 3D interactive tour of MUI-assisted SMEs using Adobe Photoshop & Blender, plus an occlusion-based method for user engagement. Applied on-page SEO (meta tags, keyword optimization) to lift ranking.',
        stack: ['Laravel 9', 'PHP', 'Blender', 'SEO'],
        metrics: [['Multi', 'Vendor'], ['Occlusion', '3D method'], ['SEO', 'Ranked']],
        url: 'https://mirror.mui.or.id/berita/32719/mui-resmi-buka-expo-virtual-umkm-halal-2021/', urlLabel: 'Read MUI announcement' },
      { num: '04', year: '2020—2021', title: 'Digital Signage CMS', role: 'Developer · Politeknik Pertanian Negeri Payakumbuh',
        desc: 'CMS-based digital signage system for dynamic content across 10 regions. Centralized content management via Xibo CMS + WordPress, enabling easier updates and consistent institutional messaging. Improved internal communication efficiency by ~40%.',
        stack: ['WordPress', 'Xibo CMS', 'PHP', 'CMS'],
        metrics: [['10', 'Regions'], ['+40%', 'Efficiency'], ['CMS', 'Centralized']],
        url: 'https://www.researchgate.net/publication/362187943_DIGITAL_SIGNAGE_SEBAGAI_MEDIA_LAYANAN_INFORMASI', urlLabel: 'Read research paper' },
    ],
    // Experience
    expEyebrow: 'Experience / Pengalaman',
    expHead: 'Experience',
    timeline: [
      { year: 'Jul 2023—Now',      cat: 'work', catLabel: 'Work', kanji: '職', title: 'Web Developer · PT FnB Tech Indonesia (Full-time)',          body: 'Technical liaison between business stakeholders and dev workflow for a green coffee exporter serving global B2B buyers. Requirements analysis & translation, system documentation, custom WordPress plugins for warehouse-frontend stock sync. PageSpeed 65 → 95+, +30% organic traffic from USA/EU via schema markup & technical SEO. 99.9% uptime, zero security breaches.' },
      { year: 'Jun 2023—Jun 2025', cat: 'work', catLabel: 'Work', kanji: '職', title: 'Web Developer · AEKI — Asosiasi Eksportir Kopi Indonesia (Remote)', body: 'Maintained and developed the national coffee exporters association web platform. Customized WordPress modules for member listings, news, and event management. Wrote user guides so non-technical admins could self-serve. Performance tuning & periodic security updates — autonomous end-to-end delivery from analysis to post-launch support.' },
      { year: 'Jul 2024—Mar 2025', cat: 'work', catLabel: 'Work', kanji: '職', title: 'Assistant Branch Manager · PT. Daya Intiguna Yasa (MR.DIY)',  body: 'Led 3 stores with 20+ staff. Used digital systems to track inventory and sales; supported data-driven decisions and trained team for service delivery.' },
      { year: 'Oct 2022—Jul 2023', cat: 'work', catLabel: 'Work', kanji: '職', title: 'Crew Store · PT. Sumber Alfaria Trijaya (Alfamart)',         body: 'Operated POS, supported digital-based promotional activities, maintained stock and sales tracking.' },
    ],
    // ─── Certifications ───────────────────────────────────────────
    certEyebrow: 'Credentials / Sertifikat',
    certHead: 'Licenses & Certifications',
    certifications: [
      { year: '2025', title: 'TOEFL Certification · Score 633',           issuer: 'Golden English',                url: 'https://geept.golden-english.net/certificate/TnZOU1d8MjAzNzR8MTExMDU3' },
      { year: '2024', title: 'CompTIA Security+ (SY0-701) Practice',      issuer: 'Udemy · Cybersecurity Fundamentals', url: 'https://www.udemy.com/certificate/UC-5e997f50-37ac-447f-86d1-7a1e8db35847/' },
      { year: '2023', title: 'General HSE Basic Education',               issuer: 'Occupational Health & Safety',  url: 'https://drive.google.com/file/d/1zUlHdtoDsiK3A7E7LhHrpJ7y1qqbDS6w/view' },
      { year: '2022', title: 'TOEFL PBT',                                 issuer: 'Paper-Based English Proficiency', url: 'https://drive.google.com/file/d/1-jooyUfYFjs3ZyWkLuKdwlqJBQtZ1qkL/view' },
      { year: '2021', title: 'Sertifikat Komputer',                       issuer: 'Office Application & Document Management', url: 'https://drive.google.com/file/d/12WRaL1MkKLKBm_MvRkUTK5z9hbocGLFr/view' },
      { year: '2021', title: 'PBK SPPUR',                                 issuer: 'Pelatihan Kerja',               url: 'https://drive.google.com/file/d/15g--WdwRDa6ebhRGJLYEXLpK1EpybqZ2/view' },
      { year: '2020', title: 'UI/UX Design Training',                     issuer: 'Sanbercode',                    url: 'https://drive.google.com/file/d/1yT2dTIAYRUHogNORmvKtPGWDlTLQ1wsQ/view' },
      { year: '2020', title: 'Adobe & Blender · Graphic Design',          issuer: 'Visual Design & 3D Modeling',   url: 'https://drive.google.com/file/d/1IIyGxy5lVKLr-t8zhnapCyK4SkOwWL43/view' },
      { year: '2020', title: 'Python for Data Science',                   issuer: 'Sanbercode',                    url: 'https://drive.google.com/file/d/1pZkpOsMqdGbiC3UjoWn0UAu1jqb4reht/view' },
    ],
    // ─── Education ────────────────────────────────────────────────
    eduEyebrow: 'Education / Pendidikan',
    eduHead: 'Education',
    education: [
      { year: 'Aug 2018 — Jan 2023', title: 'Bachelor of Engineering, Information Systems', issuer: 'Malikussaleh University',
        detail: 'GPA 3.79 / 4.00',
        body: 'Advanced Web Programming · IT Project Management · Database Systems · System Analysis & Design.' },
    ],
    // Contact
    contactEyebrow: "Let's build something / Mari ngobrol",
    contactHead: "Let's build something",
    contactName: '// Name', contactNameP: 'Your name',
    contactEmail: '// Email', contactEmailP: 'you@company.com',
    contactMsg: '// Message', contactMsgP: 'What are we building together?',
    contactSend: 'Send →',
    contactSending: 'Sending…',
    contactSent: 'Sent ✓',
    contactSuccess: "Thanks — your message landed in my inbox. I'll reply within 24 hours.",
    contactError: "Couldn't send. Please try again or email me directly at hafifhizli@gmail.com.",
    contactReply: 'Reply in < 24 hours',
    contactLocation: 'Medan, Sumatera Utara',
    contactEmailLbl: '// email',
    contactPhoneLbl: '// phone',
    contactLocLbl: '// location',
    // Footer
    footerTagline: 'Built solo in Medan, Sumatera Utara.',
    footerRights: '© 2026 Hafif Hizli — all rights reserved.',
    sitemap: '// sitemap',
    elsewhere: '// elsewhere',
    status: '// status',
    statusAvail: 'Available for select work — 2026 Q3+',
    lastUpd: 'Last updated · May 2026',
  },
  id: {
    navAvailable: 'Tersedia · 2026 Q3+',
    nav: [
      { num: '01', label: 'Tentang',     href: '#about' },
      { num: '02', label: 'Keahlian',    href: '#skills' },
      { num: '03', label: 'Pengalaman',  href: '#experience' },
      { num: '04', label: 'Proyek',      href: '#work' },
      { num: '05', label: 'Sertifikat',  href: '#certifications' },
      { num: '06', label: 'Kontak',      href: '#contact' },
    ],
    ctaHire: 'Hubungi Saya',
    heroEyebrow: 'Web Developer · Medan, ID',
    portfolioV: 'Portofolio v3',
    heroSub: <>Saya Izzy — Sarjana Teknik Sistem Informasi (IPK 3.79/4.00) dengan pengalaman langsung di Laravel, PHP, JavaScript, WordPress, dan SEO. Membangun web yang responsif dan aman — dan saya membaca log error.</>,
    seeProjects: 'Lihat Proyek →',
    letsChat: 'Mari ngobrol',
    heroStat: 'Full-Stack',
    heroStatLine1: 'PHP · Laravel · WP',
    heroStatLine2: 'SEO · Core Web Vitals',
    scroll: 'gulir ↓',
    connecting: 'menghubungkan · Medan ⇄ Global',
    nowPlaying: 'Sedang diputar',
    musicTitle: '青のすみか',
    musicArtist: 'Kitani Tatsuya · 呪術廻戦 OP',
    aboutEyebrow: 'Tentang / About',
    aboutHead: 'Tentang Saya',
    aboutLead: <>Selamat datang. Saya lulusan Sistem Informasi <strong>Universitas Malikussaleh</strong> (IPK 3.79/4.00) — <strong>kandidat System Analyst</strong> yang menjembatani stakeholder bisnis dan tim teknis.</>,
    aboutP1: <>2+ tahun menerjemahkan kebutuhan bisnis menjadi solusi teknis yang efektif. Saya mengumpulkan requirements pengguna, merancang konsep solusi, menyusun dokumentasi terstruktur (flow, modul, spesifikasi), dan mengirimkan end-to-end dengan <strong>PHP, Laravel, JavaScript, MySQL, dan WordPress</strong>.</>,
    aboutP2: <>Track record optimasi sistem — <strong>uptime 99.9%</strong>, <strong>PageSpeed 95+</strong>, dan <strong>+30% trafik organik</strong> dari pasar ekspor utama via schema markup dan technical SEO.</>,
    aboutP3: <>Workflow yang di-augmentasi AI — <strong>Claude, Claude Code, Claude Design, Gemini, dan ChatGPT</strong> — dipakai harian untuk percepatan klarifikasi requirements, drafting dokumentasi, dan problem-solving. Berbasis di <strong>Medan, Sumatera Utara</strong> — terbuka untuk peran system analyst dan web development remote / hybrid.</>,
    skillsEyebrow: 'Keahlian / Skills',
    skillsHead: 'Keahlian',
    skills: [
      { num: '01', label: 'Analisis Sistem', icon: 'analysis', kanji: '分析', items: [
        { icon: 'lucide:clipboard-list',          text: 'Requirements gathering' },
        { icon: 'lucide:git-branch',              text: 'User flow & use case mapping' },
        { icon: 'lucide:workflow',                text: 'BPMN · Flowchart' },
        { icon: 'lucide:file-text',               text: 'Spesifikasi teknis' },
        { icon: 'lucide:check-square',            text: 'System testing & UAT' },
      ]},
      { num: '02', label: 'Bahasa',        icon: 'code', kanji: '言語', items: [
        { icon: 'simple-icons:php',               text: 'PHP 8.x' },
        { icon: 'simple-icons:javascript',        text: 'JavaScript (ES6+)' },
        { icon: 'simple-icons:laravel',           text: 'Laravel 9' },
        { icon: 'simple-icons:html5',             text: 'HTML5 · CSS3' },
        { icon: 'simple-icons:mysql',             text: 'SQL · MySQL' },
      ]},
      { num: '03', label: 'CMS & Platform', icon: 'cms', kanji: '設計', items: [
        { icon: 'simple-icons:wordpress',         text: 'WordPress · Tema kustom' },
        { icon: 'lucide:puzzle',                  text: 'Plugin kustom' },
        { icon: 'simple-icons:woocommerce',       text: 'WooCommerce' },
        { icon: 'simple-icons:elementor',         text: 'Elementor Pro' },
        { icon: 'lucide:blocks',                  text: 'Blok Gutenberg' },
      ]},
      { num: '04', label: 'Performa & SEO', icon: 'bolt', kanji: '速度', items: [
        { icon: 'lucide:gauge',                   text: 'Core Web Vitals (LCP/CLS/INP)' },
        { icon: 'lucide:rocket',                  text: 'WP Rocket · LiteSpeed' },
        { icon: 'lucide:braces',                  text: 'Schema markup' },
        { icon: 'simple-icons:googleanalytics',   text: 'GA4 · Search Console' },
        { icon: 'lucide:search',                  text: 'On-page SEO' },
      ]},
      { num: '05', label: 'Workflow AI', icon: 'ai',   kanji: '知能', items: [
        { icon: 'simple-icons:anthropic',         text: 'Claude · Claude Code' },
        { icon: 'lucide:palette',                 text: 'Claude Design' },
        { icon: 'simple-icons:googlegemini',      text: 'Gemini AI' },
        { icon: 'simple-icons:openai',            text: 'ChatGPT' },
        { icon: 'lucide:wand-sparkles',           text: 'Analisis dibantu AI' },
      ]},
      { num: '06', label: 'Ops & Keamanan', icon: 'lock', kanji: '安全', items: [
        { icon: 'simple-icons:github',            text: 'Git / GitHub' },
        { icon: 'simple-icons:cpanel',            text: 'cPanel / WHM' },
        { icon: 'lucide:shield-check',            text: 'Wordfence · SSL' },
        { icon: 'lucide:badge-check',             text: 'CompTIA Security+' },
        { icon: 'lucide:file-text',               text: 'Agile · Dokumentasi' },
      ]},
    ],
    workEyebrow: 'Karya Terpilih / Selected Work',
    workHead: 'Karya Terpilih',
    projects: [
      { num: '01', year: '2023—Kini', title: 'Platform Web AEKI (aeki-aice.org)', role: 'Web Developer · Asosiasi Eksportir Kopi Indonesia',
        desc: 'Membangun dan memelihara website asosiasi eksportir kopi nasional — modul listing member, berita/pengumuman, dan manajemen event di WordPress. Tuning performa berkelanjutan, technical SEO, dan dukungan workflow konten menumbuhkan jangkauan organik hingga 55.000+ pengunjung per bulan, melayani eksportir Indonesia dan pembeli kopi B2B global.',
        stack: ['WordPress', 'PHP', 'Technical SEO', 'Performa'],
        metrics: [['55K+', 'Trafik/bulan'], ['2+', 'Tahun aktif'], ['99,9%', 'Uptime']],
        url: 'https://aeki-aice.org/', urlLabel: 'Kunjungi web AEKI' },
      { num: '02', year: '2022—2023', title: 'VR Tour Creation', role: 'Lead Developer · Universitas Malikussaleh',
        desc: 'Web tour 360° imersif untuk Fakultas Teknik. Dibangun dengan Laravel 9, PHP, JavaScript, dan HTML untuk interaktivitas. Pipeline gambar menggunakan Adobe Photoshop, 3D Stitcher, Google Street View, dan 3D Vista. Menarik 1.000+ pengunjung dan mengubah cara fakultas memperkenalkan kampus.',
        stack: ['Laravel 9', 'PHP', 'JavaScript', '3D Vista', 'SEO'],
        metrics: [['1K+', 'Pengunjung'], ['360°', 'Panorama'], ['1', 'Fakultas']],
        url: 'https://sisteminformasi.unimal.ac.id/vr-tour/', urlLabel: 'Lihat VR tour' },
      { num: '03', year: '2021—2022', title: 'E-Marketplace UMKM', role: 'Web Developer · MUI Economic Congress (Umat II)',
        desc: 'Marketplace responsif dan aman untuk mendukung UMKM, dibangun dengan Laravel 9. Ditambah 3D interactive tour UMKM binaan MUI menggunakan Adobe Photoshop & Blender, plus metode berbasis occlusion untuk engagement. On-page SEO (meta tags, optimasi keyword) untuk menaikkan ranking.',
        stack: ['Laravel 9', 'PHP', 'Blender', 'SEO'],
        metrics: [['Multi', 'Vendor'], ['Occlusion', 'Metode 3D'], ['SEO', 'Ranked']],
        url: 'https://mirror.mui.or.id/berita/32719/mui-resmi-buka-expo-virtual-umkm-halal-2021/', urlLabel: 'Baca rilis MUI' },
      { num: '04', year: '2020—2021', title: 'Digital Signage CMS', role: 'Developer · Politeknik Pertanian Negeri Payakumbuh',
        desc: 'Sistem digital signage berbasis CMS untuk konten dinamis di 10 wilayah. Manajemen konten tersentralisasi via Xibo CMS + WordPress untuk update yang lebih mudah dan konsistensi pesan institusi. Meningkatkan efisiensi komunikasi internal ~40%.',
        stack: ['WordPress', 'Xibo CMS', 'PHP', 'CMS'],
        metrics: [['10', 'Wilayah'], ['+40%', 'Efisiensi'], ['CMS', 'Sentralisasi']],
        url: 'https://www.researchgate.net/publication/362187943_DIGITAL_SIGNAGE_SEBAGAI_MEDIA_LAYANAN_INFORMASI', urlLabel: 'Baca paper riset' },
    ],
    expEyebrow: 'Pengalaman / Experience',
    expHead: 'Pengalaman',
    timeline: [
      { year: 'Jul 2023—Kini',     cat: 'work', catLabel: 'Kerja', kanji: '職', title: 'Web Developer · PT FnB Tech Indonesia (Full-time)',          body: 'Penghubung teknis antara stakeholder bisnis dan workflow dev untuk eksportir kopi hijau yang melayani pembeli B2B global. Analisis & translasi requirements, dokumentasi sistem, plugin WordPress kustom untuk sinkronisasi stok gudang ke frontend. PageSpeed 65 → 95+, +30% trafik organik dari pasar AS/Eropa via schema markup & technical SEO. Uptime 99.9%, tanpa breach keamanan.' },
      { year: 'Jun 2023—Jun 2025', cat: 'work', catLabel: 'Kerja', kanji: '職', title: 'Web Developer · AEKI — Asosiasi Eksportir Kopi Indonesia (Remote)', body: 'Memelihara dan mengembangkan platform web asosiasi eksportir kopi nasional. Kustomisasi modul WordPress untuk listing member, berita, dan manajemen event. Menulis user guide agar admin non-teknis bisa self-service. Tuning performa & update keamanan berkala — delivery end-to-end mandiri dari analisis hingga support pasca-launch.' },
      { year: 'Jul 2024—Mar 2025', cat: 'work', catLabel: 'Kerja', kanji: '職', title: 'Assistant Branch Manager · PT. Daya Intiguna Yasa (MR.DIY)',  body: 'Memimpin 3 toko dengan 20+ staf. Sistem digital untuk tracking inventaris & sales; mendukung keputusan berbasis data dan melatih tim untuk service delivery.' },
      { year: 'Okt 2022—Jul 2023', cat: 'work', catLabel: 'Kerja', kanji: '職', title: 'Crew Store · PT. Sumber Alfaria Trijaya (Alfamart)',         body: 'Mengoperasikan POS, aktivitas promosi berbasis digital, laporan stok dan tracking penjualan.' },
    ],
    // ─── Sertifikat ───────────────────────────────────────────────
    certEyebrow: 'Sertifikat / Credentials',
    certHead: 'Lisensi & Sertifikat',
    certifications: [
      { year: '2025', title: 'Sertifikasi TOEFL · Skor 633',               issuer: 'Golden English',                  url: 'https://geept.golden-english.net/certificate/TnZOU1d8MjAzNzR8MTExMDU3' },
      { year: '2024', title: 'CompTIA Security+ (SY0-701) Practice',       issuer: 'Udemy · Fondasi Cybersecurity',   url: 'https://www.udemy.com/certificate/UC-5e997f50-37ac-447f-86d1-7a1e8db35847/' },
      { year: '2023', title: 'General HSE Basic Education',                issuer: 'K3 — Kesehatan & Keselamatan Kerja', url: 'https://drive.google.com/file/d/1zUlHdtoDsiK3A7E7LhHrpJ7y1qqbDS6w/view' },
      { year: '2022', title: 'TOEFL PBT',                                  issuer: 'Paper-Based English Proficiency', url: 'https://drive.google.com/file/d/1-jooyUfYFjs3ZyWkLuKdwlqJBQtZ1qkL/view' },
      { year: '2021', title: 'Sertifikat Komputer',                        issuer: 'Aplikasi Perkantoran & Manajemen Dokumen', url: 'https://drive.google.com/file/d/12WRaL1MkKLKBm_MvRkUTK5z9hbocGLFr/view' },
      { year: '2021', title: 'PBK SPPUR',                                  issuer: 'Pelatihan Kerja',                 url: 'https://drive.google.com/file/d/15g--WdwRDa6ebhRGJLYEXLpK1EpybqZ2/view' },
      { year: '2020', title: 'UI/UX Design Training',                      issuer: 'Sanbercode',                      url: 'https://drive.google.com/file/d/1yT2dTIAYRUHogNORmvKtPGWDlTLQ1wsQ/view' },
      { year: '2020', title: 'Adobe & Blender · Desain Grafis',            issuer: 'Desain Visual & Pemodelan 3D',    url: 'https://drive.google.com/file/d/1IIyGxy5lVKLr-t8zhnapCyK4SkOwWL43/view' },
      { year: '2020', title: 'Python for Data Science',                    issuer: 'Sanbercode',                      url: 'https://drive.google.com/file/d/1pZkpOsMqdGbiC3UjoWn0UAu1jqb4reht/view' },
    ],
    // ─── Pendidikan ───────────────────────────────────────────────
    eduEyebrow: 'Pendidikan / Education',
    eduHead: 'Pendidikan',
    education: [
      { year: 'Agu 2018 — Jan 2023', title: 'Sarjana Teknik, Sistem Informasi', issuer: 'Universitas Malikussaleh',
        detail: 'IPK 3.79 / 4.00',
        body: 'Pemrograman Web Lanjut · Manajemen Proyek IT · Basis Data & Sistem Informasi · Analisis & Desain Sistem.' },
    ],
    contactEyebrow: 'Mari ngobrol / Let\'s build something',
    contactHead: 'Mari bangun sesuatu',
    contactName: '// Nama', contactNameP: 'Nama Anda',
    contactEmail: '// Email', contactEmailP: 'anda@perusahaan.com',
    contactMsg: '// Pesan', contactMsgP: 'Apa yang akan kita bangun bersama?',
    contactSend: 'Kirim →',
    contactSending: 'Mengirim…',
    contactSent: 'Terkirim ✓',
    contactSuccess: 'Terima kasih — pesan sudah masuk ke inbox saya. Saya balas dalam 24 jam.',
    contactError: 'Gagal mengirim. Coba lagi atau email langsung ke hafifhizli@gmail.com.',
    contactReply: 'Balasan dalam < 24 jam',
    contactLocation: 'Medan, Sumatera Utara',
    contactEmailLbl: '// email',
    contactPhoneLbl: '// telepon',
    contactLocLbl: '// lokasi',
    footerTagline: 'Dibangun sendiri di Medan, Sumatera Utara.',
    footerRights: '© 2026 Hafif Hizli — semua hak dilindungi.',
    sitemap: '// peta situs',
    elsewhere: '// di tempat lain',
    status: '// status',
    statusAvail: 'Tersedia untuk pekerjaan terpilih — 2026 Q3+',
    lastUpd: 'Pembaruan terakhir · Mei 2026',
  },
};

/* ============================ Contact form config ============================ */
// Web3Forms access key — register at https://web3forms.com using your email
// (hafifhizli@gmail.com) and paste the key below. The key is client-side by
// design; spam is filtered server-side by Web3Forms.
const WEB3FORMS_ACCESS_KEY = '10782fc0-ba23-4593-98e3-bac2305cde46';

/* ============================ Defaults ============================ */
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "accent": ["#BD4F4F", "#415F78", "#E6B1A7", "#FFD3B9", "#272420"],
  "showGlitch": true,
  "showAurora": true,
  "showKanji": true,
  "showCursor": true,
  "showGrain": true,
  "showMusicPlayer": true,
  "showGlassChips": true,
  "showGlassOrbs": true,
  "available": true,
  "heroLayout": "centered"
}/*EDITMODE-END*/;

// Accent palettes — each option is a full color scheme. First color is the
// signature/hero color used as the active --accent; the rest become
// auxiliary variables (--accent-2, --accent-3, …) for any element that
// wants to reach into the palette beyond the primary.
const ACCENT_OPTIONS = [
  // Ryomen Sukuna (Jujutsu Kaisen) — red-led, warm earth supporting tones
  ['#BD4F4F', '#415F78', '#E6B1A7', '#FFD3B9', '#272420'],
  // Suguru Geto (Jujutsu Kaisen) — forest-led with gold, navy and cream
  ['#416239', '#D7A03E', '#222D55', '#F0D9C9', '#37536C'],
  // Toji Fushiguro (Jujutsu Kaisen) — dark blue-gray, silver, muted purple
  ['#2F3547', '#BABABA', '#7F5977', '#EED0BB', '#373A3F'],
];
const ACCENT_LABELS = ['両面宿儺', '夏油傑', '伏黒甚爾'];

/* ============================ Liquid Glass Music Player ============================ */
function MusicPlayer({ lang, floating = true }) {
  const t = T[lang];
  const audioRef = useRef(null);
  const [playing, setPlaying]         = useState(false);   // no autoplay
  const [duration, setDuration]       = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Hook into the real audio element for time / duration / ended events.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime   = () => setCurrentTime(audio.currentTime || 0);
    const onEnded  = () => setPlaying(false);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Drive play/pause from React state — handles autoplay-block by reverting.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      const p = audio.play();
      if (p && p.catch) p.catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = Math.max(0, duration - currentTime);
  const fmt = (s) => {
    if (!s || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  };
  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <div className={`music-player lg-glass${floating ? ' is-floating' : ''}`} data-cursor="hot">
      <audio ref={audioRef} src="assets/aono-sumika.mp3" preload="metadata" />
      <div className="music-bg" aria-hidden="true" />
      <div className="music-cover">
        <img src="assets/music-cover.webp" alt="" />
      </div>
      <div className="music-info">
        <div className="music-eyebrow"><span className="live"></span>{t.nowPlaying}</div>
        <div className="music-title">{t.musicTitle}</div>
        <div className="music-artist">{t.musicArtist}</div>
      </div>
      <div className="music-progress" onClick={seek}>
        <span className="music-time">{fmt(currentTime)}</span>
        <div className="music-bar" style={{'--p': progress + '%'}}></div>
        <span className="music-time r">-{fmt(remaining)}</span>
      </div>
      <div className="music-controls">
        <div className="music-btns">
          <button className="music-btn" aria-label="prev" onClick={() => { const a=audioRef.current; if(a) a.currentTime = Math.max(0, a.currentTime - 10); }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg></button>
          <button className="music-btn play" aria-label={playing ? 'pause' : 'play'} onClick={() => setPlaying(p => !p)}>
            {playing
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
          </button>
          <button className="music-btn" aria-label="next" onClick={() => { const a=audioRef.current; if(a) a.currentTime = Math.min(a.duration || 0, a.currentTime + 10); }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg></button>
        </div>
        <div className={`music-eq${playing ? ' is-playing' : ''}`} aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}

/* ============================ Icon set ============================ */
const ICON = {
  cms: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6.5" cy="6.5" r=".6" fill="currentColor"/><circle cx="9" cy="6.5" r=".6" fill="currentColor"/><path d="M7 13h6M7 16h10"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/><circle cx="12" cy="16" r="1.2"/>
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>
    </svg>
  ),
  edu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11v5a6 6 0 0012 0v-5"/>
    </svg>
  ),
  cert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6"/><path d="M9 14l-1 7 4-2 4 2-1-7"/>
    </svg>
  ),
  course: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h10a4 4 0 014 4v11H8a4 4 0 01-4-4V5z"/><path d="M4 16a4 4 0 014-4h10"/>
    </svg>
  ),
  analysis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><path d="M9 11h6M9 14h6"/>
    </svg>
  ),
};

/* ============================ Custom Hero (bilingual + glass) ============================ */
function MyHero({ lang, tweaks }) {
  const t = T[lang];
  const portraitRef = useRef(null);
  const layout = tweaks.heroLayout || 'centered';
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const onMove = (e) => {
      if (!portraitRef.current) return;
      const x = (e.clientX / innerWidth - 0.5) * 18;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      portraitRef.current.style.setProperty('--px', x + 'px');
      portraitRef.current.style.setProperty('--py', y + 'px');
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <section className={`hero hero--${layout}`} id="top">
      {tweaks.showAurora && <div className="aurora" />}
      {tweaks.showGrain && <div className="grain" />}
      {tweaks.showGlassOrbs && (
        <div className="lg-orbs"><span></span><span></span><span></span><span></span></div>
      )}

      {tweaks.showKanji && (
        <>
          <div className="hero-kanji" aria-hidden="true">速</div>
          <div className="hero-vkana" aria-hidden="true">
            <span>ウ</span><span>ェ</span><span>ブ</span>
            <span className="sep">・</span>
            <span>デ</span><span>ベ</span><span>ロ</span><span>ッ</span><span>パ</span><span>ー</span>
          </div>
        </>
      )}

      <div className="hero-eyebrow-row">
        <span className="eyebrow"><span className="num" style={{color:'var(--accent)'}}>01</span> — {t.heroEyebrow}</span>
        <span className="eyebrow"><span className="num" style={{color:'var(--accent)'}}>{new Date().getFullYear()}</span> — {t.portfolioV}</span>
      </div>

      <div className={`hero-focal hero-focal--${layout}`}>
        <div className="hero-focal-col hero-focal-col--left">
          <h1 className="hero-name">
            <span className="glitch" data-text="HAFIF">HAFIF</span>
            <span className="glitch" data-text="HIZLI.">HIZLI<span className="acc">.</span></span>
          </h1>
          {tweaks.showMusicPlayer && (
            <div className="hero-focal-music">
              <MusicPlayer lang={lang} floating={false} />
            </div>
          )}
        </div>
        <div className="hero-focal-col hero-focal-col--right">
          <div ref={portraitRef} className="hero-portrait">
            <img src="assets/izzy.webp" alt="Portrait of Hafif Hizli" />
            {tweaks.showKanji && <div className="hero-seal-mini" aria-hidden="true"><span>始</span></div>}
          </div>
          <div className="hero-sub lg-glass">
            <p>{t.heroSub}</p>
            <div className="hero-cta-row">
              <a href="#work" className="btn btn-primary">{t.seeProjects}</a>
              <a href="#contact" className="btn btn-on-dark">{t.letsChat}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-anchor hero-anchor--stat" aria-hidden="false">
        <div className="hero-stat-card hero-stat-card--text lg-strong">
          <div className="num">{t.heroStat}</div>
          <div className="lab">{t.heroStatLine1}<br/>{t.heroStatLine2}</div>
        </div>
      </div>

      <a href="#about" className="scroll-mouse" aria-label="Scroll down">
        <span className="scroll-mouse-body"><span className="scroll-mouse-wheel"></span></span>
        <span className="scroll-mouse-label">{lang === 'id' ? 'Gulir' : 'Scroll'}</span>
      </a>

      <div className="hero-bottom-bar">
        <span>{t.scroll}</span>
        <span>{t.connecting}</span>
      </div>
    </section>
  );
}

/* ============================ Bilingual sections ============================ */
function MySectionHead({ num, en, id, kanji, onDark }) {
  return (
    <div className="section-head">
      <span className="eyebrow"><span className="num">// {num}</span> — {id}</span>
      <h2 className="display-lg">{en}</h2>
      {kanji && <div className="section-kanji">{kanji}</div>}
    </div>
  );
}

function MyAbout({ lang }) {
  const t = T[lang];
  return (
    <section className="about" id="about">
      <MySectionHead num="01" en={t.aboutHead} id={t.aboutEyebrow} kanji="自己" />
      <div className="about-grid">
        <div><p className="lead">{t.aboutLead}</p></div>
        <div className="about-body">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <p>{t.aboutP3}</p>
        </div>
      </div>

      {t.education && t.education.length > 0 && (
        <div className="about-edu">
          <h3 className="about-edu-head">{t.eduHead}</h3>
          {t.education.map((e, i) => (
            <article className="about-edu-card" key={i}>
              <div className="about-edu-meta">
                <span className="about-edu-year">{e.year}</span>
              </div>
              <div className="about-edu-body">
                <h4 className="about-edu-title">{e.title}</h4>
                <p className="about-edu-issuer">{e.issuer}</p>
                <p className="about-edu-detail"><strong>{e.detail}</strong></p>
                <p className="about-edu-summary">{e.body}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function MySkills({ lang }) {
  const t = T[lang];
  return (
    <section className="skills" id="skills">
      <MySectionHead num="02" en={t.skillsHead} id={t.skillsEyebrow} kanji="技術" />
      <div className="skills-grid">
        {t.skills.map(g => (
          <div className="skill-block" key={g.num}>
            <div className="skill-head">
              <span className="skill-icon" aria-hidden="true">{ICON[g.icon]}</span>
              <div className="skill-head-text">
                <span className="num">{g.num} <span className="skill-kanji">{g.kanji}</span></span>
                <span className="lab">{g.label}</span>
              </div>
            </div>
            <ul>{g.items.map((it, i) => {
              const isBrand = it.icon.startsWith('simple-icons:');
              const slug = it.icon.replace('simple-icons:', '');
              return (
                <li key={i}>
                  {isBrand ? (
                    // Simple Icons CDN serves the SVG already painted in the brand's
                    // official color (WordPress blue, Laravel red, etc.).
                    <img
                      className="skill-item-icon"
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt=""
                      width="20"
                      height="20"
                      loading="lazy"
                    />
                  ) : (
                    // Lucide-family icons via Iconify, used as a CSS mask so the icon
                    // colour follows --accent (re-tints when the palette is switched).
                    <span
                      className="skill-item-icon skill-item-icon--mono"
                      style={{
                        WebkitMaskImage: `url(https://api.iconify.design/${it.icon}.svg)`,
                        maskImage: `url(https://api.iconify.design/${it.icon}.svg)`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  {it.text}
                </li>
              );
            })}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function MyWork({ lang }) {
  const t = T[lang];
  return (
    <section className="work" id="work">
      <MySectionHead num="04" en={t.workHead} id={t.workEyebrow} kanji="仕事" />
      <div className="work-list">
        {t.projects.map((p, i) => (
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
              {p.url && (
                <a className="project-link" href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.urlLabel || (lang === 'id' ? 'Buka proyek' : 'Visit project')} <span aria-hidden="true">↗</span>
                </a>
              )}
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

function MyCertifications({ lang }) {
  const t = T[lang];
  return (
    <section className="certifications" id="certifications">
      <MySectionHead num="05" en={t.certHead} id={t.certEyebrow} kanji="証明" />
      <ul className="cert-grid">
        {t.certifications.map((c, i) => {
          const Tag = c.url ? 'a' : 'div';
          const props = c.url
            ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' }
            : {};
          return (
            <li key={i}>
              <Tag className={`cert-card${c.url ? '' : ' cert-card--static'}`} {...props}>
                <span className="cert-year">{c.year}</span>
                <div className="cert-body">
                  <strong className="cert-title">{c.title}</strong>
                  <em className="cert-issuer">{c.issuer}</em>
                  {c.url && (
                    <span className="cert-cta">
                      {lang === 'id' ? 'Lihat kredensial' : 'Show credential'} <span aria-hidden="true">↗</span>
                    </span>
                  )}
                </div>
              </Tag>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function MyExperience({ lang }) {
  const t = T[lang];
  return (
    <section className="experience" id="experience">
      <MySectionHead num="03" en={t.expHead} id={t.expEyebrow} kanji="経歴" />
      <ol className="timeline">
        {t.timeline.map((row, i) => (
          <li key={i} data-cat={row.cat}>
            <div className="t-year">
              <span className="t-cat-icon" aria-hidden="true">{ICON[row.cat]}</span>
              <div className="t-year-text">
                <span className={`t-cat t-cat--${row.cat}`}>{row.catLabel}</span>
                <span className="t-year-num">{row.year}</span>
              </div>
            </div>
            <div className="t-body">
              <h3>{row.title}</h3>
              <p>{row.body}</p>
            </div>
            <div className="t-mark" aria-hidden="true">
              <span className="t-kanji">{row.kanji}</span>
              <span className="t-idx">{String(i+1).padStart(2,'0')}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MyContact({ lang }) {
  const t = T[lang];
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio contact from ${form.name || 'visitor'}`,
          from_name: 'Hafif Hizli Portfolio',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (_err) {
      setStatus('error');
    }
  };

  const btnLabel =
    status === 'sending' ? t.contactSending :
    status === 'success' ? t.contactSent :
    t.contactSend;

  return (
    <section className="contact" id="contact">
      <div className="aurora aurora--soft" />
      <div className="grain" />
      <div className="contact-inner">
        <MySectionHead num="06" en={t.contactHead} id={t.contactEyebrow} kanji="連絡" />
        <div className="contact-grid">
          <form className="contact-form lg-card" style={{padding: '24px'}} onSubmit={onSubmit}>
            <div className="row-2">
              <div><label>{t.contactName}</label><input required value={form.name} onChange={update('name')} placeholder={t.contactNameP} /></div>
              <div><label>{t.contactEmail}</label><input required type="email" value={form.email} onChange={update('email')} placeholder={t.contactEmailP} /></div>
            </div>
            <div><label>{t.contactMsg}</label><textarea required rows="4" value={form.message} onChange={update('message')} placeholder={t.contactMsgP}></textarea></div>
            <div className="contact-actions">
              <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>{btnLabel}</button>
              <span className="micro">{t.contactReply}</span>
            </div>
            {status === 'success' && <p className="contact-status contact-status--ok" role="status">{t.contactSuccess}</p>}
            {status === 'error'   && <p className="contact-status contact-status--err" role="alert">{t.contactError}</p>}
          </form>
          <aside className="contact-aside">
            <div className="seal">至</div>
            <div className="contact-direct">
              <div><span className="micro">{t.contactEmailLbl}</span><a href="mailto:hafifhizli@gmail.com">hafifhizli@gmail.com</a></div>
              <div><span className="micro">{t.contactPhoneLbl}</span><a href="tel:+6281363901524">+62 813-6390-1524</a></div>
              <div><span className="micro">{t.contactLocLbl}</span><span>{t.contactLocation}</span></div>
            </div>
            <div className="contact-social">
              <a href="https://www.linkedin.com/in/hafifhizli/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><img src="assets/linkedin.png" alt="" /></a>
              <a href="https://www.instagram.com/hafifhizli" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="assets/instagram.png" alt="" /></a>
              <a href="https://github.com/hafifhizli" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><img src="https://cdn.simpleicons.org/github/000000" alt="" /></a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function MyFooter({ lang }) {
  const t = T[lang];
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-name">HAFIF HIZLI<span style={{color:'var(--accent)'}}>.</span></div>
          <p className="micro">{t.footerTagline}<br/>{t.footerRights}</p>
        </div>
        <div className="footer-col">
          <span className="micro">{t.sitemap}</span>
          {t.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </div>
        <div className="footer-col">
          <span className="micro">{t.elsewhere}</span>
          <a href="https://www.linkedin.com/in/hafifhizli/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/hafifhizli" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.instagram.com/hafifhizli" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        </div>
        <div className="footer-col">
          <span className="micro">{t.status}</span>
          <div className="status"><span className="dot" />{t.statusAvail}</div>
          <p className="micro" style={{marginTop:8}}>{t.lastUpd}</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================ App ============================ */
function applyAccent(palette) {
  // Accept both legacy single hex and the new palette array form.
  const colors = Array.isArray(palette) ? palette : [palette];
  const root = document.documentElement;
  root.style.setProperty('--accent', colors[0]);
  root.style.setProperty('--accent-hover', colors[0]);
  root.style.setProperty('--shu-500', colors[0]);
  root.style.setProperty('--shu-600', colors[0]);
  // Expose the rest of the palette so other UI can reach into it.
  root.style.setProperty('--accent-2', colors[1] || colors[0]);
  root.style.setProperty('--accent-3', colors[2] || colors[0]);
  root.style.setProperty('--accent-4', colors[3] || colors[0]);
  root.style.setProperty('--accent-5', colors[4] || colors[0]);
  // Sync the aurora variables so the hero aurora / orbs / glows pick up
  // the active palette tone instead of staying locked to the Sukuna defaults.
  root.style.setProperty('--aurora-ember',  colors[0]);
  root.style.setProperty('--aurora-rose',   colors[1] || colors[0]);
  root.style.setProperty('--aurora-orange', colors[2] || colors[0]);
  root.style.setProperty('--aurora-amber',  colors[3] || colors[0]);
}

function App() {
  const [t, setTweak] = window.useTweaks(DEFAULTS);
  const lang = t.lang || 'en';
  const ts = T[lang];

  useEffect(() => { applyAccent(t.accent); }, [t.accent]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  return (
    <>
      {t.showCursor && <CustomCursor />}
      <Header items={ts.nav} ctaLabel={ts.ctaHire} />

      <main data-screen-label="portfolio" className={`layout-${t.heroLayout || 'centered'}`}>
        <MyHero lang={lang} tweaks={t} />
        <div className="reveal"><MyAbout          lang={lang} /></div>
        <div className="reveal"><MySkills         lang={lang} /></div>
        <div className="reveal"><MyExperience     lang={lang} /></div>
        <div className="reveal"><MyWork           lang={lang} /></div>
        <div className="reveal"><MyCertifications lang={lang} /></div>
        <div className="reveal"><MyContact        lang={lang} /></div>
      </main>

      <MyFooter lang={lang} />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label={lang === 'id' ? 'Bahasa' : 'Language'}>
          <window.TweakRadio
            value={lang}
            options={[
              { value: 'en', label: 'EN' },
              { value: 'id', label: 'ID' },
            ]}
            onChange={(v) => setTweak('lang', v)}
          />
        </window.TweakSection>

        <window.TweakSection label={lang === 'id' ? 'Tata letak' : 'Layout'}>
          <window.TweakRadio
            value={t.heroLayout || 'centered'}
            options={[
              { value: 'centered', label: lang === 'id' ? 'Tengah' : 'Center' },
              { value: 'split',    label: lang === 'id' ? 'Samping' : 'Side' },
            ]}
            onChange={(v) => setTweak('heroLayout', v)}
          />
        </window.TweakSection>

        <window.TweakSection label={lang === 'id' ? 'Aksen' : 'Accent'}>
          <window.TweakColor value={t.accent} options={ACCENT_OPTIONS} onChange={(v) => setTweak('accent', v)} />
          <div className="accent-captions" aria-hidden="true" style={{
            display: 'flex',
            gap: '6px',
            marginTop: '6px',
          }}>
            {ACCENT_LABELS.map((label, i) => (
              <span key={i} style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif",
                fontSize: '11px',
                letterSpacing: '.08em',
                color: 'rgba(41,38,27,.62)',
                lineHeight: 1.25,
              }}>{label}</span>
            ))}
          </div>
        </window.TweakSection>

        <window.TweakSection label={lang === 'id' ? 'Tampilan' : 'Display'}>
          <window.TweakToggle label={lang === 'id' ? 'Aksen Jepang' : 'Japanese accents'} value={t.showKanji} onChange={(v) => setTweak('showKanji', v)} />
          <window.TweakToggle label={lang === 'id' ? 'Efek aurora' : 'Aurora effects'} value={t.showAurora} onChange={(v) => setTweak({ showAurora: v, showGrain: v, showGlassOrbs: v })} />
          <window.TweakToggle label="Music player" value={t.showMusicPlayer} onChange={(v) => setTweak('showMusicPlayer', v)} />
          <window.TweakToggle label={lang === 'id' ? 'Kursor kustom' : 'Custom cursor'} value={t.showCursor} onChange={(v) => setTweak('showCursor', v)} />
        </window.TweakSection>
      </window.TweaksPanel>

      <style>{`
        ${!t.showGlitch ? '.glitch::before, .glitch::after { display: none !important; }' : ''}
        ${!t.showAurora ? '.aurora { display: none !important; }' : ''}
        ${!t.showKanji  ? '.section-kanji { display: none !important; }' : ''}
        ${!t.showGrain  ? '.grain { display: none !important; }' : ''}
        ${!t.available  ? '.site-footer .status .dot { background: var(--paper-400) !important; box-shadow: none !important; animation: none !important; }' : ''}
      `}</style>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
