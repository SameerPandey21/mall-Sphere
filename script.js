const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   VIDEO SOURCES — Real YouTube videos + Unsplash images
   ============================================================ */
const VIDEOS = {
  heroYT: 'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workBvtZxFGJi&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1',
  showcaseMain: 'https://www.youtube.com/embed/2UHkJVnFlyE?autoplay=1&mute=1&loop=1&controls=0&rel=0&playsinline=1',
  events: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1&loop=1&controls=0&rel=0&playsinline=1',
  heroPoster: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?w=1920&q=85&auto=format',
  showreel: 'https://www.youtube.com/embed/TqJ4XPLP9wE?autoplay=1&mute=1&controls=0&rel=0&playsinline=1',
};

const STOCK_VIDEOS = {
  hero: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4',
  mall: 'https://videos.pexels.com/video-files/3125396/3125396-hd_1920_1080_25fps.mp4',
  crowd: 'https://videos.pexels.com/video-files/2795405/2795405-hd_1920_1080_25fps.mp4',
  concert: 'https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_30fps.mp4',
  retail: 'https://videos.pexels.com/video-files/3252878/3252878-hd_1920_1080_30fps.mp4',
  luxury: 'https://videos.pexels.com/video-files/6894460/6894460-hd_1920_1080_30fps.mp4',
  dining: 'https://videos.pexels.com/video-files/1581478/1581478-hd_1920_1080_30fps.mp4',
  themepark: 'https://videos.pexels.com/video-files/5946667/5946667-hd_1920_1080_30fps.mp4',
  skating: 'https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_25fps.mp4',
  snowboard: 'https://videos.pexels.com/video-files/2330978/2330978-hd_1920_1080_30fps.mp4',
  aquarium: 'https://videos.pexels.com/video-files/3214448/3214448-hd_1920_1080_25fps.mp4',
  ferris: 'https://videos.pexels.com/video-files/2795405/2795405-hd_1920_1080_25fps.mp4',
  eventcrowd: 'https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_30fps.mp4',
  architecture: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4',
};

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&q=85&auto=format&fit=crop',
  atrium: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?w=1200&q=80&auto=format',
  luxury: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format',
  dining: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80&auto=format',
  concert: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80&auto=format',
  ski: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=900&q=80&auto=format',
  aquarium: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=900&q=80&auto=format',
  icerink: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80&auto=format',
  themepark: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=900&q=80&auto=format',
  ferris: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80&auto=format',
  retail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80&auto=format',
  flagship: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80&auto=format',
  event: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80&auto=format',
  cta: 'https://images.unsplash.com/photo-1573164713712-03f600560118?w=1600&q=80&auto=format',
  popup: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=80&auto=format',
  fnb: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&auto=format',
};

/* ============================================================
   HOOK: useReveal
   ============================================================ */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    targets.forEach(t => obs.observe(t));
    if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right')) obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ============================================================
   HOOK: useBarChart
   ============================================================ */
function useBarChart() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-width]').forEach(bar => {
            setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ============================================================
   HOOK: useCounter
   ============================================================ */
function useCounter() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-count]').forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const suffix = counter.dataset.suffix || '';
            const duration = 2000;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 4);
              counter.textContent = Math.round(ease * target) + suffix;
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ============================================================
   COMPONENT: Cursor
   ============================================================ */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.current.style.left = e.clientX + 'px';
      dot.current.style.top = e.clientY + 'px';
    };
    const onEnter = () => { dot.current.classList.add('active'); ring.current.classList.add('active'); };
    const onLeave = () => { dot.current.classList.remove('active'); ring.current.classList.remove('active'); };
    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    let raf;
    const loop = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.1;
      ring.current.style.left = ringPos.current.x + 'px';
      ring.current.style.top = ringPos.current.y + 'px';
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

/* ============================================================
   COMPONENT: Loader
   ============================================================ */
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let w = 0;
    const t = setInterval(() => {
      w += Math.random() * 14 + 4;
      if (w >= 100) { w = 100; clearInterval(t); setTimeout(() => { setOut(true); setTimeout(onDone, 900); }, 300); }
      setProgress(Math.min(Math.round(w), 100));
    }, 90);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`loader-screen ${out ? 'out' : ''}`}>
      <div className="text-center">
        <p className="font-syne text-[9px] tracking-[.4em] text-gold-dim uppercase mb-4">Loading Experience</p>
        <h1 className="font-display text-4xl font-light text-gold tracking-wider">AMERICAN DREAM</h1>
        <p className="font-syne text-[8px] tracking-[.5em] text-cream-dim uppercase mt-2">East Rutherford · New Jersey</p>
      </div>
      <div className="loader-progress mt-10">
        <div className="loader-fill" style={{ width: progress + '%' }} />
      </div>
      <p className="text-[9px] text-cream-dim mt-3 tracking-[.2em] font-syne">{progress}%</p>
    </div>
  );
}

/* ============================================================
   COMPONENT: ProgressBar
   ============================================================ */
function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      setWidth(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress-bar" style={{ width: width + '%' }} />;
}

/* ============================================================
   COMPONENT: Nav
   ============================================================ */
function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['Property', 'Retail', 'Experiences', 'Events', 'Partners', 'Leasing'];
  const ids = ['#overview', '#retail', '#attractions', '#events', '#sponsorship', '#leasing'];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-500 ${scrolled ? 'nav-glass py-3' : 'py-7'}`}>
      <div className="max-w-[1340px] mx-auto px-12 flex items-center justify-between">
        <a href="#hero" className="flex flex-col leading-none">
          <span className="font-display text-gold text-lg tracking-[.22em] uppercase">American Dream</span>
          <span className="font-syne text-[7.5px] tracking-[.45em] text-cream-dim uppercase mt-0.5">East Rutherford · NJ</span>
        </a>
        <ul className="hidden lg:flex gap-8">
          {links.map((l, i) => (
            <li key={l}><a href={ids[i]} className="font-syne text-[10px] font-600 tracking-[.15em] uppercase text-cream-muted hover:text-cream transition-colors duration-200 relative group">
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a></li>
          ))}
        </ul>
        <button onClick={() => onCTA('contact')} className="cta-btn-primary px-6 py-2.5 text-[9px] tracking-[.2em] cursor-none hidden sm:block">
          <span>Get in Touch</span>
        </button>
      </div>
    </nav>
  );
}

/* ============================================================
   COMPONENT: DotNav
   ============================================================ */
function DotNav() {
  const [active, setActive] = useState(0);
  const sections = ['hero', 'stats', 'overview', 'retail', 'attractions', 'events', 'sponsorship', 'leasing', 'demographics', 'cta'];
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = sections.indexOf(e.target.id);
          if (idx > -1) setActive(idx);
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[700] hidden xl:flex flex-col gap-3">
      {sections.map((s, i) => (
        <a key={s} href={`#${s}`} title={s} className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${active === i ? 'bg-gold scale-125' : 'bg-cream-dim hover:bg-cream-muted'}`} />
      ))}
    </nav>
  );
}

/* ============================================================
   COMPONENT: Marquee
   ============================================================ */
function MarqueeStrip() {
  const items = ['Retail Leasing', 'Brand Sponsorship', 'Event Booking', 'Luxury Wing', 'Nickelodeon Universe', '40M Visitors', 'Performing Arts', 'Big SNOW Ski Resort', 'SEA LIFE Aquarium', 'Exposition Center'];
  const doubled = [...items, ...items];
  return (
    <div className="bg-gold py-3.5 overflow-hidden">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="font-syne text-[10px] font-700 tracking-[.28em] uppercase text-ink px-10 inline-flex items-center gap-6">
            {item}
            <span className="inline-block w-1 h-1 bg-ink/40 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENT: Hero
   ============================================================ */
function Hero({ onCTA }) {
  const ref = useCounter();
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-end overflow-hidden grain" ref={ref}>
      <video
        ref={videoRef}
        className="video-bg"
        autoPlay muted loop playsInline
        preload="auto"
        poster={IMAGES.hero}
      >
        <source src={STOCK_VIDEOS.hero} type="video/mp4" />
        <img src={IMAGES.hero} alt="American Dream Mall" className="video-fallback" />
      </video>

      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to top, rgba(8,8,9,1) 0%, rgba(8,8,9,.55) 35%, rgba(8,8,9,.15) 100%)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to right, rgba(8,8,9,.7) 0%, transparent 55%)' }} />

      <div className="relative z-[2] w-full max-w-[1340px] mx-auto px-12 pb-20">
        <div style={{ opacity: 0, animation: 'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s forwards' }}>
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-px bg-gold" />
            <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">North America's Largest Destination · Est. 2019</span>
          </div>
        </div>
        <h1 className="font-display font-light leading-[.88] tracking-tight mb-8" style={{ fontSize: 'clamp(58px, 9vw, 128px)', opacity: 0, animation: 'slideUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.65s forwards' }}>
          The World's<br />
          <em className="text-gold">Most Valuable</em><br />
          <span style={{ WebkitTextStroke: '1px rgba(240,235,224,.25)', color: 'transparent' }}>Commercial Stage</span>
        </h1>
        <div className="flex flex-wrap items-start gap-12" style={{ opacity: 0, animation: 'slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 1s forwards' }}>
          <p className="font-sans font-light text-cream-muted text-[15px] leading-relaxed max-w-sm">
            3 million square feet. 40 million visitors per year.<br />One destination where brands become legends.
          </p>
          <div className="flex gap-10 pl-10 border-l border-white/10">
            {[
              { count: 40, suffix: 'M+', label: 'Annual Visitors' },
              { count: 55, suffix: 'M', label: 'Metro Reach' },
              { count: 500, suffix: '+', label: 'Brands' },
              { count: 16, suffix: 'min', label: 'From Manhattan' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-gold font-light leading-none" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }} data-count={stat.count} data-suffix={stat.suffix}>0</div>
                <div className="font-syne text-[8.5px] tracking-[.18em] uppercase text-cream-dim mt-1.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-10" style={{ opacity: 0, animation: 'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.3s forwards' }}>
          <button onClick={() => document.getElementById('overview').scrollIntoView({ behavior: 'smooth' })} className="cta-btn-primary px-9 py-3.5 text-[9px] cursor-none">
            <span>Explore the Property</span>
          </button>
          <button onClick={() => onCTA('contact')} className="cta-btn-outline px-9 py-3.5 text-[9px] cursor-none">
            Schedule a Briefing
          </button>
        </div>
      </div>

      <div className="absolute right-12 bottom-20 z-[2] flex flex-col items-center gap-3" style={{ opacity: 0, animation: 'fadeIn 1s ease 2s forwards' }}>
        <div className="scroll-indicator-line" />
        <span className="font-syne text-[7.5px] tracking-[.3em] uppercase text-cream-dim" style={{ writingMode: 'vertical-lr' }}>Scroll</span>
      </div>

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}

/* ============================================================
   COMPONENT: Stats
   ============================================================ */
function Stats() {
  const ref = useReveal();
  const cRef = useCounter();
  const stats = [
    { n: 40, sfx: 'M+', label: 'Annual Visitors', sub: 'Largest in N. America' },
    { n: 3, sfx: 'M sqft', label: 'Gross Leasable Area', sub: 'Retail + Entertainment' },
    { n: 5, sfx: 'B+', label: 'Total Investment', sub: 'USD Development Cost', raw: '$5B+' },
    { n: 55, sfx: 'M', label: 'Population Catchment', sub: '2-hour drive radius' },
    { n: 4, sfx: '.8H', label: 'Avg Dwell Time', sub: '2× national average', raw: '4.8H' },
  ];
  return (
    <section id="stats" className="py-24" ref={el => { ref.current = el; cRef.current = el; }}>
      <div className="max-w-[1340px] mx-auto px-12">
        <div className="grid grid-cols-5 border border-white/[.07]" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal delay-${i + 1} px-9 py-11 border-r border-white/[.07] last:border-r-0 hover:bg-ink-3 transition-colors duration-500`}>
              <div className="font-display text-gold font-light leading-none mb-3" style={{ fontSize: 'clamp(38px, 4vw, 58px)' }}>
                {s.raw ? s.raw : <span data-count={s.n} data-suffix={s.sfx}>0</span>}
              </div>
              <div className="font-sans text-[12px] text-cream-muted">{s.label}</div>
              <div className="font-syne text-[9px] tracking-widest uppercase text-cream-dim mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: ShowcaseGrid (Video-first)
   ============================================================ */
function ShowcaseGrid({ onPlay }) {
  const ref = useReveal();
  const videos = [
    { src: STOCK_VIDEOS.mall, poster: IMAGES.atrium, tag: 'Grand Atrium', name: 'The Heart of American Dream', size: 'main', ytId: '2UHkJVnFlyE' },
    { src: STOCK_VIDEOS.retail, poster: IMAGES.retail, tag: 'Retail', name: '500+ World-Class Brands', size: 'sm', ytId: 'JGwWNGJdvx8' },
    { src: STOCK_VIDEOS.themepark, poster: IMAGES.themepark, tag: 'Entertainment', name: 'Nickelodeon Universe', size: 'sm', ytId: 'https://www.youtube.com/watch?v=321ZVzux8Xs' },
  ];
  const vRefs = useRef([]);

  useEffect(() => {
    vRefs.current.forEach(v => { if (v) v.play().catch(() => {}); });
  }, []);

  return (
    <section className="pb-2" ref={ref}>
      <div className="max-w-[1340px] mx-auto px-12 mb-14">
        <div className="flex items-end justify-between">
          <div>
            <div className="reveal flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-gold" />
              <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">Visual Overview</span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display font-light leading-[.92] tracking-tight" style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}>
              Scale You Have To<br /><em className="text-gold">See To Believe.</em>
            </h2>
          </div>
        </div>
      </div>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '640px' }}>
        <div className="showcase-card reveal" style={{ gridRow: '1 / 2' }} onClick={() => onPlay(videos[0].ytId)}>
          <video ref={el => vRefs.current[0] = el} className="video-bg" autoPlay muted loop playsInline preload="none" poster={videos[0].poster}>
            <source src={videos[0].src} type="video/mp4" />
            <img src={videos[0].poster} alt={videos[0].name} className="video-fallback" />
          </video>
          <div className="card-overlay" />
          <div className="card-info">
            <div className="font-syne text-[8.5px] font-700 tracking-[.25em] uppercase text-gold mb-1.5">{videos[0].tag}</div>
            <div className="font-display text-[24px] font-light">{videos[0].name}</div>
          </div>
          <div className="play-btn">
            <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center backdrop-blur-md">
              <div className="w-0 h-0 ml-1.5" style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid #C9933A' }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[3px]">
          {videos.slice(1).map((v, i) => (
            <div key={i} className={`showcase-card reveal delay-${i + 2} flex-1`} onClick={() => onPlay(v.ytId)}>
              <video ref={el => vRefs.current[i + 1] = el} className="video-bg" autoPlay muted loop playsInline preload="none" poster={v.poster}>
                <source src={v.src} type="video/mp4" />
                <img src={v.poster} alt={v.name} className="video-fallback" />
              </video>
              <div className="card-overlay" />
              <div className="card-info">
                <div className="font-syne text-[8px] font-700 tracking-[.2em] uppercase text-gold mb-1">{v.tag}</div>
                <div className="font-display text-xl font-light">{v.name}</div>
              </div>
              <div className="play-btn">
                <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center backdrop-blur-md">
                  <div className="w-0 h-0 ml-1" style={{ borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #C9933A' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: Overview
   ============================================================ */
function Overview() {
  const ref = useReveal();
  const features = [
    { n: '01', title: 'Unrivaled Location', body: '16 minutes from Midtown Manhattan. Adjacent to MetLife Stadium. Served by NJ Transit and three international airports. 55 million consumers within a two-hour drive.' },
    { n: '02', title: 'Entertainment-Driven Footfall', body: "North America's only indoor ski resort. The Western Hemisphere's largest indoor theme park. An NHL-regulation ice rink. Entertainment generates the traffic retail alone never could." },
    { n: '03', title: 'A Global Media Platform', body: '300+ events per year generate billions of media impressions. This is not a building — it is the most efficient brand amplification engine in the tri-state market.' },
    { n: '04', title: 'Premium Demographics', body: '$138K+ average HHI. 62% Millennials & Gen Z. 38% international visitors. The highest-value consumer audience in North American retail real estate, consistently, at scale.' },
  ];
  return (
    <section id="overview" className="py-32" ref={ref}>
      <div className="max-w-[1340px] mx-auto px-12">
        <div className="grid gap-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="reveal-left relative" style={{ height: '640px' }}>
            <div className="overflow-hidden h-full">
              <img src={IMAGES.hero} alt="American Dream" className="parallax-img w-full h-full object-cover" style={{ filter: 'brightness(.75)' }} />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-gold p-6 text-ink text-center z-10">
              <div className="font-display text-[42px] font-600 leading-none">#1</div>
              <div className="font-syne text-[8px] font-700 tracking-[.2em] uppercase mt-1">N. America</div>
            </div>
          </div>
          <div>
            <div className="reveal flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">The Property</span>
            </div>
            <h2 className="reveal delay-1 font-display font-light leading-[.92] tracking-tight mb-7" style={{ fontSize: 'clamp(38px, 5vw, 70px)' }}>
              Not a Mall.<br /><em className="text-gold">A Nation.</em>
            </h2>
            <p className="reveal delay-2 font-sans font-light text-cream-muted text-[14px] leading-[1.9] mb-12 max-w-md">
              The most ambitious mixed-use commercial destination ever built in North America — where retail, entertainment, hospitality, and live events coexist at a scale no standalone brand could create independently.
            </p>
            <div className="space-y-0">
              {features.map((f, i) => (
                <div key={f.n} className={`reveal delay-${i + 2} border-b border-white/[.06] py-6 group hover:pl-3 transition-all duration-300`}>
                  <h4 className="font-display text-[19px] font-light text-cream flex items-center gap-4 mb-2">
                    <span className="font-syne text-[9px] font-600 text-gold tracking-widest min-w-[24px]">{f.n}</span>
                    {f.title}
                  </h4>
                  <p className="font-sans font-light text-[12.5px] text-cream-muted leading-relaxed pl-10">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: Retail (Tabbed)
   ============================================================ */
function Retail({ onCTA }) {
  const [tab, setTab] = useState('retail');
  const ref = useReveal();
  const retailVRef = useRef(null);
  const luxuryVRef = useRef(null);
  const diningVRef = useRef(null);

  const tabDef = [
    { id: 'retail', label: 'Retail' },
    { id: 'luxury', label: 'Luxury Wing' },
    { id: 'dining', label: 'Dining & Lifestyle' },
  ];

  useEffect(() => {
    [retailVRef, luxuryVRef, diningVRef].forEach(r => { if (r.current) r.current.play().catch(() => {}); });
  }, [tab]);

  return (
    <section id="retail" className="py-32 bg-ink-2" ref={ref}>
      <div className="max-w-[1340px] mx-auto px-12">
        <div className="reveal flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-gold" />
          <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">Commercial Ecosystem</span>
        </div>
        <h2 className="reveal delay-1 font-display font-light leading-[.92] tracking-tight mb-5" style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}>
          Five Worlds.<br /><em className="text-gold">One Address.</em>
        </h2>
        <p className="reveal delay-2 font-sans font-light text-cream-muted text-[14px] leading-relaxed max-w-lg mb-14">
          Every category of commercial life, at scale — from flagship luxury to immersive dining, accessible lifestyle to curated entertainment.
        </p>
        <div className="reveal delay-2 flex border-b border-white/[.07] mb-16 overflow-x-auto">
          {tabDef.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-8 py-4 font-syne text-[10px] font-600 tracking-[.15em] uppercase transition-all duration-300 border-b-2 mb-[-1px] cursor-none whitespace-nowrap ${tab === t.id ? 'text-gold border-gold' : 'text-cream-dim border-transparent hover:text-cream-muted'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'retail' && (
          <div className="grid gap-20" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="space-y-4">
              {[
                { title: '500+ Retail Stores', body: 'From global anchors to emerging DTC brands — unmatched breadth across every retail category. Average 4.8H dwell time means retailers benefit from engagement metrics that simply don\'t exist in traditional malls.' },
                { title: '$2,300+ Sales Per Square Foot', body: 'Entertainment-retail integration generates productivity that outperforms traditional mall averages by 300%+. Entertainment drives traffic; traffic drives conversion; conversion drives your bottom line.' },
                { title: 'Pop-Up Ready Infrastructure', body: 'Dedicated short-term spaces, white-box units, and high-traffic kiosks allow brands to launch in weeks. From 100 sqft kiosks to 3,000 sqft temporary flagships.' },
              ].map((f, i) => (
                <div key={f.title} className={`reveal delay-${i + 1} pl-5 border-l-2 border-gold bg-ink-3 p-6 hover:translate-x-1 transition-transform duration-300`}>
                  <h4 className="font-display text-[19px] font-light mb-2">{f.title}</h4>
                  <p className="font-sans font-light text-[12px] text-cream-muted leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
            <div className="reveal delay-2">
              <div className="relative overflow-hidden h-64 mb-5">
                <video ref={retailVRef} className="video-bg" autoPlay muted loop playsInline preload="none" poster={IMAGES.retail}>
                  <source src={STOCK_VIDEOS.retail} type="video/mp4" />
                  <img src={IMAGES.retail} alt="Retail" className="video-fallback" />
                </video>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,9,.8), transparent)' }} />
              </div>
              <p className="font-syne text-[10px] font-600 tracking-[.15em] uppercase text-cream-dim mb-3">Anchor & Key Tenants</p>
              <div className="grid grid-cols-4 gap-[1px] bg-white/[.05]">
                {['Saks Fifth Ave', 'Zara', 'Uniqlo', 'H&M', 'Apple Store', 'Nike', 'Adidas', 'Primark', 'Bath & Body', 'Forever 21', 'Barneys NY', '+300 More'].map(t => (
                  <div key={t} className="bg-ink-3 p-3 text-center hover:bg-ink-4 transition-colors">
                    <div className="font-sans text-[11px] font-500 text-cream-muted">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'luxury' && (
          <div className="grid gap-20" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="reveal-left relative">
              <div className="relative overflow-hidden" style={{ height: '520px' }}>
                <video ref={luxuryVRef} className="video-bg" autoPlay muted loop playsInline preload="none" poster={IMAGES.luxury}>
                  <source src={STOCK_VIDEOS.luxury} type="video/mp4" />
                  <img src={IMAGES.luxury} alt="Luxury" className="video-fallback" />
                </video>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,9,.7), transparent 60%)' }} />
              </div>
              <div className="absolute -bottom-5 -right-5 border border-gold/30 p-6 bg-ink-3 z-10">
                <div className="font-display text-[40px] font-light text-gold leading-none">$18.4B</div>
                <div className="font-syne text-[8.5px] tracking-[.18em] uppercase text-cream-dim mt-1">Luxury Market Potential</div>
              </div>
              <div className="grid grid-cols-3 gap-[1px] bg-white/[.05] mt-8">
                {['Louis Vuitton', 'Hermès', 'Chanel', 'Gucci', 'Dior', 'Prada', 'Bottega', 'Burberry', 'Saint Laurent'].map(b => (
                  <div key={b} className="bg-ink-3 p-3 text-center font-syne text-[9px] font-600 tracking-wider uppercase text-cream-dim hover:text-gold transition-colors">{b}</div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              {[
                { title: 'The Luxury Wing', body: 'A dedicated luxury corridor with its own architectural identity, service standards, and curated clientele. White-glove service, private client access, and curated adjacencies only.' },
                { title: '$18.4B Luxury Market Potential', body: 'Annual luxury spend potential within the tri-state catchment — more than any comparable retail trade area globally. 42% of visitors earn $150K+ household income.' },
                { title: 'International Clientele', body: '38% of visitors are international guests drawn by EWR and JFK proximity. International visitors represent the highest-spending demographic in global luxury retail.' },
              ].map((f, i) => (
                <div key={f.title} className={`reveal delay-${i + 1} pl-5 border-l-2 border-gold bg-ink-3 p-6`}>
                  <h4 className="font-display text-[19px] font-light text-gold-light mb-2">{f.title}</h4>
                  <p className="font-sans font-light text-[12px] text-cream-muted leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'dining' && (
          <div className="grid gap-20" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="space-y-3">
              {[
                { n: '100+', title: 'Restaurants & Food Concepts', body: 'Every daypart, every appetite. American Dream\'s F&B program is a destination within the destination — drawing visitors who come specifically to dine.' },
                { n: '6', title: 'Celebrity Chef Venues', body: 'Nationally recognized culinary partnerships bring destination dining that competes directly with NYC\'s best — positioned 16 minutes from Midtown.' },
                { n: '4', title: 'Distinct F&B Zones', body: 'Luxury restaurant row, global food hall, casual dining court, entertainment-integrated F&B — each with distinct architectural character and menu curation.' },
                { n: '4.8H', title: 'Average Dwell Time', body: 'Dining + entertainment account for 55% of visitor time. Every F&B operator benefits from a captive, engaged audience that\'s already decided to stay.' },
              ].map((f, i) => (
                <div key={f.n} className={`reveal delay-${i + 1} flex gap-5 bg-ink-3 p-5 hover:bg-ink-4 transition-colors`}>
                  <div className="font-display text-[38px] font-light text-gold leading-none min-w-[68px]">{f.n}</div>
                  <div>
                    <h4 className="font-sans text-[13.5px] font-500 mb-1.5">{f.title}</h4>
                    <p className="font-sans font-light text-[11.5px] text-cream-muted leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal delay-2 relative overflow-hidden" style={{ minHeight: '520px' }}>
              <video ref={diningVRef} className="video-bg" autoPlay muted loop playsInline preload="none" poster={IMAGES.dining}>
                <source src={STOCK_VIDEOS.dining} type="video/mp4" />
                <img src={IMAGES.dining} alt="Dining" className="video-fallback" />
              </video>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,9,.85), transparent 50%)' }} />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-syne text-[9px] tracking-[.25em] uppercase text-gold mb-2">F&B Revenue Model</div>
                {[['Restaurant Row', 88], ['Entertainment F&B', 92], ['Food Hall', 76], ['QSR / Casual', 65]].map(([lbl, val]) => (
                  <div key={lbl} className="flex items-center gap-3 mb-2">
                    <span className="font-sans text-[10px] text-cream-muted min-w-[110px]">{lbl}</span>
                    <div className="flex-1 h-[3px] bg-white/[.08] rounded-full overflow-hidden">
                      <div className="stat-bar-fill" data-width={val} style={{ width: val + '%' }} />
                    </div>
                    <span className="font-sans text-[10px] text-cream-muted min-w-[32px]">{val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: Attractions (Video-first)
   ============================================================ */
function Attractions() {
  const ref = useReveal();
  const videoRefs = useRef([]);

  const cards = [
    { src: STOCK_VIDEOS.snowboard, poster: IMAGES.ski, tag: 'Indoor · Year-Round', name: 'Big SNOW Ski Resort', desc: "North America's only indoor ski resort. 16,000 sqft of real snow, year-round.", size: 'large' },
    { src: STOCK_VIDEOS.themepark, poster: IMAGES.themepark, tag: 'Theme Park · 165,000 sqft', name: 'Nickelodeon Universe', desc: 'Largest indoor theme park in the Western Hemisphere. 35+ rides.', size: 'small' },
    { src: STOCK_VIDEOS.aquarium, poster: IMAGES.aquarium, tag: 'Aquarium · Immersive', name: 'SEA LIFE Aquarium', desc: 'Walk-through ocean tunnels, shark lagoon, 10+ themed zones.', size: 'small' },
    { src: STOCK_VIDEOS.skating, poster: IMAGES.icerink, tag: 'Year-Round · Events', name: 'NHL Ice Rink', desc: 'Full NHL-regulation ice. Professional games & private bookings.', size: 'small' },
    { src: STOCK_VIDEOS.ferris, poster: IMAGES.ferris, tag: 'Signature · Observation', name: 'The Dream Wheel', desc: 'Panoramic views of the NYC skyline — an iconic activation stage.', size: 'small' },
    { src: STOCK_VIDEOS.crowd, poster: IMAGES.concert, tag: 'Multi-Level · Corporate', name: 'Gaming & Mini Golf', desc: 'Interactive entertainment fully bookable for private & corporate events.', size: 'small' },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const v = e.target.querySelector('video');
        if (v) { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }
      });
    }, { threshold: 0.2 });
    videoRefs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="attractions" className="py-32" ref={ref}>
      <div className="max-w-[1340px] mx-auto px-12 mb-16">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <div className="reveal flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">Entertainment</span>
            </div>
            <h2 className="reveal delay-1 font-display font-light leading-[.92] tracking-tight" style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}>
              No Theme Park<br /><em className="text-gold">Ticket Required.</em>
            </h2>
          </div>
          <p className="reveal delay-2 font-sans font-light text-cream-muted text-[14px] leading-[1.9] self-end">
            American Dream's attractions would anchor standalone destination parks. Here, they are simply part of the address — the most powerful footfall engine in North American retail.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: '360px 360px', gap: '3px', margin: '0 56px' }}>
        {cards.map((c, i) => {
          const gridStyle = [
            { gridColumn: '1 / 5', gridRow: '1 / 2' },
            { gridColumn: '5 / 9', gridRow: '1 / 2' },
            { gridColumn: '9 / 13', gridRow: '1 / 2' },
            { gridColumn: '1 / 7', gridRow: '2 / 3' },
            { gridColumn: '7 / 10', gridRow: '2 / 3' },
            { gridColumn: '10 / 13', gridRow: '2 / 3' },
          ][i];
          return (
            <div key={c.name} ref={el => videoRefs.current[i] = el} className={`attr-card reveal delay-${i + 1}`} style={gridStyle}>
              <video autoPlay muted loop playsInline preload="none" poster={c.poster} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}>
                <source src={c.src} type="video/mp4" />
                <img src={c.poster} alt={c.name} className="video-fallback" />
              </video>
              <div className="info">
                <div className="font-syne text-[8px] font-700 tracking-[.25em] uppercase text-gold mb-1.5">{c.tag}</div>
                <div className="font-display font-light mb-1.5" style={{ fontSize: 'clamp(15px, 1.6vw, 22px)' }}>{c.name}</div>
                <div className="desc font-sans font-light text-[11px] text-cream-muted leading-relaxed">{c.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-[1340px] mx-auto px-12 mt-14">
        <div className="reveal grid grid-cols-4 border border-white/[.06]" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[['15+', 'Attractions'], ['3.5M', 'Sqft Entertainment'], ['4.8H', 'Avg Dwell Time'], ['312%', 'Vs Mall Average']].map(([n, l]) => (
            <div key={l} className="py-10 text-center border-r border-white/[.06] last:border-r-0 bg-ink-2">
              <div className="font-display text-[52px] font-light text-gold leading-none">{n}</div>
              <div className="font-syne text-[9px] tracking-[.2em] uppercase text-cream-dim mt-2">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: Events (Video-heavy)
   ============================================================ */
function Events({ onPlay, onCTA }) {
  const ref = useReveal();
  const heroVRef = useRef(null);

  useEffect(() => {
    if (heroVRef.current) heroVRef.current.play().catch(() => {});
  }, []);

  return (
    <section id="events" className="py-32 bg-ink-2" ref={ref}>
      <div className="max-w-[1340px] mx-auto px-12">
        <div className="reveal flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-gold" />
          <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">The Global Stage</span>
        </div>
        <h2 className="reveal delay-1 font-display font-light leading-[.92] tracking-tight mb-5" style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}>
          Where the World's<br /><em className="text-gold">Biggest Moments</em><br />Are Made.
        </h2>
        <p className="reveal delay-2 font-sans font-light text-cream-muted text-[14px] leading-relaxed max-w-xl mb-16">
          300+ events per year. Zero slow days. A media platform that reaches 55 million consumers with every activation.
        </p>

        <div className="grid gap-20" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="reveal-left">
            <div className="relative overflow-hidden cursor-none" style={{ height: '420px' }} onClick={() => onPlay('5qap5aO4i9A')}>
              <video ref={heroVRef} className="video-bg" autoPlay muted loop playsInline preload="none" poster={IMAGES.event}>
                <source src={STOCK_VIDEOS.eventcrowd} type="video/mp4" />
                <img src={IMAGES.event} alt="Event" className="video-fallback" />
              </video>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,9,.85), rgba(8,8,9,.1))' }} />
              <div className="absolute inset-0 flex items-center justify-center group">
                <div className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/25">
                  <div className="w-0 h-0 ml-2" style={{ borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderLeft: '24px solid #C9933A' }} />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-syne text-[8px] tracking-[.2em] uppercase text-gold mb-1">Live Event Footage</div>
                <div className="font-display text-[22px] font-light">The Energy of American Dream</div>
              </div>
              <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="font-syne text-[8px] font-700 tracking-[.15em] uppercase text-white">Crowd Energy</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-[1px] bg-white/[.05] mt-[3px]">
              {[['12,500', 'Max Cap.'], ['300+', 'Events/Yr'], ['4', 'Venues'], ['$2.4B', 'Media Value']].map(([n, l]) => (
                <div key={l} className="bg-ink-3 py-5 text-center">
                  <div className="font-display text-[30px] font-light text-gold leading-none">{n}</div>
                  <div className="font-syne text-[8px] tracking-[.15em] uppercase text-cream-dim mt-1.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-[2px] mb-8">
              {[
                { icon: '🎵', name: 'Concerts & Music', detail: 'Up to 12,500 capacity' },
                { icon: '🏆', name: 'Sports & Gaming', detail: 'NHL-spec + courts' },
                { icon: '🎪', name: 'Brand Activations', detail: 'Custom build-outs' },
                { icon: '💼', name: 'Corporate & Expo', detail: '500K sqft expo hall' },
              ].map((c, i) => (
                <div key={c.name} className={`reveal delay-${i + 2} bg-ink-3 p-6 hover:bg-ink-4 transition-colors duration-300 cursor-none`}>
                  <div className="text-2xl mb-3">{c.icon}</div>
                  <div className="font-syne text-[11px] font-600 tracking-[.1em] uppercase mb-1">{c.name}</div>
                  <div className="font-sans text-[10.5px] text-cream-dim">{c.detail}</div>
                </div>
              ))}
            </div>
            <div className="font-syne text-[9px] font-700 tracking-[.25em] uppercase text-cream-dim pb-3 border-b border-white/[.07] mb-0">Sample Programming</div>
            {[
              ['JAN', 'Q1', 'Celebrity Fashion Week Pop-Up', '40,000+ attendees, international media', 'Activation'],
              ['MAR', 'Q1', 'International Auto Show', '3-day expo, 200+ brands, 180K visitors', 'Exhibition'],
              ['JUN', 'Q2', 'Summer Concert Series', '8-week A-list residency, 12,500-cap', 'Concert'],
              ['SEP', 'Q3', 'Global Tech Product Launch', '72-hr exclusive, 200M+ social reach', 'Launch'],
              ['NOV', 'Q4', 'Holiday Spectacular', '8-week programming, 3M+ visitors', 'Programming'],
            ].map(([m, q, title, desc, tag], i) => (
              <div key={title} className={`reveal delay-${i + 2} flex items-center gap-6 py-4 border-b border-white/[.06] hover:pl-2 transition-all duration-300`}>
                <div className="min-w-[52px] text-center">
                  <div className="font-display text-[22px] font-light text-gold leading-none">{m}</div>
                  <div className="font-syne text-[7.5px] tracking-widest uppercase text-cream-dim">{q}</div>
                </div>
                <div className="flex-1">
                  <div className="font-sans text-[12.5px] font-500 mb-0.5">{title}</div>
                  <div className="font-sans text-[11px] text-cream-muted font-light">{desc}</div>
                </div>
                <div className="font-syne text-[7.5px] font-700 tracking-[.15em] uppercase text-cream-dim border border-white/10 px-2.5 py-1 whitespace-nowrap">{tag}</div>
              </div>
            ))}
            <button onClick={() => onCTA('event')} className="cta-btn-primary w-full py-3.5 text-[9px] mt-7 cursor-none">
              <span>Inquire About Event Booking</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: Sponsorship
   ============================================================ */
function Sponsorship({ onCTA }) {
  const ref = useReveal();
  return (
    <section id="sponsorship" className="py-32" ref={ref}>
      <div className="relative h-[420px] overflow-hidden mb-24">
        <img src={IMAGES.event} alt="Crowd" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(.35)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,9,.9) 0%, rgba(8,8,9,.4) 100%)' }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12">
          <div className="reveal flex items-center gap-3 mb-5 justify-center">
            <div className="w-6 h-px bg-gold" />
            <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">Partnerships</span>
            <div className="w-6 h-px bg-gold" />
          </div>
          <h2 className="reveal delay-1 font-display font-light leading-[.92] tracking-tight mb-5" style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}>
            Own the Audience.<br /><em className="text-gold">Command the Stage.</em>
          </h2>
          <p className="reveal delay-2 font-sans font-light text-cream-muted text-[14px] leading-relaxed max-w-lg">
            Sponsorship here is not advertising. It is ownership of an audience — the most concentrated, affluent, and engaged consumer base in North America.
          </p>
        </div>
      </div>

      <div className="max-w-[1340px] mx-auto px-12">
        <div className="reveal grid grid-cols-4 gap-[1px] bg-white/[.06] mb-20">
          {[['40M+', 'Annual Impressions'], ['$138K', 'Avg Household Income'], ['4.8H', 'Engagement Duration'], ['85%', 'Brand Recall Rate']].map(([n, l]) => (
            <div key={l} className="bg-ink py-10 px-8 text-center">
              <div className="font-display text-[48px] font-light text-gold leading-none mb-2">{n}</div>
              <div className="font-syne text-[9px] tracking-[.2em] uppercase text-cream-dim">{l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-[2px]" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { name: 'Platinum Partner', price: '$5M+', featured: false, features: ['Category exclusivity across property', 'Naming rights — one major venue', 'Premium digital display network (A)', '2 annual event programming rights', 'VIP hospitality suite access', 'Permanent custom activation space', 'Dedicated executive team'] },
            { name: 'Gold Partner', price: '$2M+', featured: true, features: ['Priority digital display positions', '1 major annual event activation', 'Co-branded content & media rights', 'Preferential pop-up retail access', 'Guest data & analytics dashboard', 'Social media integration program'] },
            { name: 'Brand Partner', price: '$500K+', featured: false, features: ['Digital display network inclusion', '2 seasonal activation rights/year', 'Event co-sponsorship options', 'Co-branded social content', 'Quarterly audience insights'] },
          ].map((t, i) => (
            <div key={t.name} className={`reveal delay-${i + 2} tier-card relative p-11 bg-ink-3 border ${t.featured ? 'border-gold/30' : 'border-white/[.06]'}`}>
              {t.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-gold text-ink font-syne text-[7.5px] font-800 tracking-[.25em] uppercase px-5 py-1">Most Popular</div>
              )}
              <div className="font-syne text-[9px] font-700 tracking-[.3em] uppercase text-gold mb-3">{t.name}</div>
              <div className="font-display text-[52px] font-light leading-none mb-1">{t.price}</div>
              <div className="font-sans text-[11px] text-cream-dim mb-9">Annual Partnership Value</div>
              <ul className="space-y-2.5 mb-10">
                {t.features.map(f => (
                  <li key={f} className="font-sans text-[11.5px] text-cream-muted font-light pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-gold before:text-[10px]">{f}</li>
                ))}
              </ul>
              <button onClick={() => onCTA('sponsor')} className={`w-full py-3 font-syne text-[9px] font-700 tracking-[.18em] uppercase cursor-none transition-all duration-300 ${t.featured ? 'cta-btn-primary' : 'cta-btn-outline'}`}>
                {t.featured ? <span>Explore Gold</span> : `Explore ${t.name.split(' ')[0]}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: Leasing
   ============================================================ */
function Leasing({ onCTA }) {
  const ref = useReveal();
  const cards = [
    { tag: 'Flagship / Anchor', title: 'Make a Statement', desc: 'Large-format flagship spaces designed as brand cathedrals. Full creative control, maximum visibility, landmark positioning in North America\'s most visited destination.', img: IMAGES.flagship, details: [['Size', '5,000 – 100,000+ sqft'], ['Term', '5 – 15 years'], ['TI Packages', 'Available']] },
    { tag: 'Luxury & Fine Retail', title: 'Enter the Luxury Wing', desc: 'Curated adjacencies, dedicated concierge, affluent clientele. The most concentrated luxury market in North America — by invitation only.', img: IMAGES.luxury, details: [['Size', '1,000 – 8,000 sqft'], ['Avg Zone HHI', '$180,000+'], ['Adjacencies', 'By invitation']] },
    { tag: 'Food & Beverage', title: 'Feed the Destination', desc: 'Celebrity chef partnerships, QSR operators, specialty concepts. High dwell time means high cover counts — every single day of the year.', img: IMAGES.fnb, details: [['Size', '500 – 12,000 sqft'], ['Avg Covers/Day', '1,200 – 4,500'], ['Format', 'QSR, Casual, Fine']] },
    { tag: 'Pop-Up & Short-Term', title: 'Test at Scale', desc: 'From 100 sqft kiosks to 3,000 sqft white-box units. Launch a concept in 7 days. Test the world\'s most powerful retail market with minimal commitment.', img: IMAGES.popup, details: [['Size', '100 – 3,000 sqft'], ['Min Term', '1 week'], ['Go-Live', 'As fast as 7 days']] },
  ];

  return (
    <section id="leasing" className="py-32 bg-ink-2" ref={ref}>
      <div className="max-w-[1340px] mx-auto px-12 mb-16">
        <div className="reveal flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-gold" />
          <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">Leasing Opportunities</span>
        </div>
        <div className="flex items-end justify-between">
          <h2 className="reveal delay-1 font-display font-light leading-[.92] tracking-tight" style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}>
            Find Your<br /><em className="text-gold">Position.</em>
          </h2>
          <p className="reveal delay-2 font-sans font-light text-cream-muted text-[14px] leading-relaxed max-w-md pb-2">
            Whether you're opening a flagship, testing a new format, or anchoring a category — American Dream has a space engineered for your ambition.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[3px]">
        {cards.map((c, i) => (
          <div key={c.tag} className={`lease-card reveal delay-${i + 1} relative`} style={{ minHeight: '500px' }}>
            <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to top, rgba(8,8,9,.97) 0%, rgba(8,8,9,.5) 50%, rgba(8,8,9,.2) 100%)' }} />
            <div className="relative z-[2] p-12 h-full flex flex-col justify-end">
              <div className="font-syne text-[8px] font-700 tracking-[.3em] uppercase text-gold mb-3">{c.tag}</div>
              <h3 className="font-display text-[30px] font-light mb-3 leading-tight">{c.title}</h3>
              <p className="font-sans font-light text-[12.5px] text-cream-muted leading-relaxed mb-6">{c.desc}</p>
              <div className="space-y-1.5 mb-7">
                {c.details.map(([lbl, val]) => (
                  <div key={lbl} className="flex justify-between text-[11px] py-2 border-b border-white/[.06]">
                    <span className="text-cream-dim">{lbl}</span>
                    <span className="font-500">{val}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onCTA('lease')} className="cta-btn-outline py-2.5 px-0 text-[9px] cursor-none flex items-center gap-3 group w-fit">
                <span>Learn More</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: Demographics
   ============================================================ */
function Demographics() {
  const ref = useReveal();
  const barRef = useBarChart();
  return (
    <section id="demographics" className="py-32" ref={el => { ref.current = el; barRef.current = el; }}>
      <div className="max-w-[1340px] mx-auto px-12">
        <div className="reveal flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-gold" />
          <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">Audience Intelligence</span>
        </div>
        <h2 className="reveal delay-1 font-display font-light leading-[.92] tracking-tight mb-5" style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}>
          The Numbers<br /><em className="text-gold">That Close Deals.</em>
        </h2>
        <p className="reveal delay-2 font-sans font-light text-cream-muted text-[14px] leading-relaxed max-w-xl mb-16">
          No other commercial real estate asset in North America delivers the scale, quality, and diversity of audience that American Dream does — consistently, measurably, every day.
        </p>

        <div className="grid gap-20" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <div className="reveal bg-ink-3 p-9 mb-5">
              <div className="font-syne text-[10px] font-600 tracking-[.18em] uppercase text-cream-dim mb-6">Visitor Age Distribution</div>
              <div className="space-y-4">
                {[['18–24', 62, '22%'], ['25–34', 80, '28%'], ['35–44', 72, '25%'], ['45–54', 43, '15%'], ['55+', 29, '10%']].map(([l, w, v]) => (
                  <div key={l} className="flex items-center gap-4">
                    <span className="font-sans text-[11px] text-cream-muted min-w-[52px] text-right">{l}</span>
                    <div className="flex-1 h-[3px] bg-white/[.06] rounded-full overflow-hidden">
                      <div className="stat-bar-fill" data-width={w} />
                    </div>
                    <span className="font-sans text-[10.5px] text-cream-muted min-w-[32px] font-500">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal delay-1 bg-ink-3 p-9">
              <div className="font-syne text-[10px] font-600 tracking-[.18em] uppercase text-cream-dim mb-6">Per-Visit Spend Distribution</div>
              <div className="space-y-4">
                {[['$200+', 55, '38%'], ['$100–200', 70, '31%'], ['$50–100', 45, '20%'], ['Under $50', 25, '11%']].map(([l, w, v]) => (
                  <div key={l} className="flex items-center gap-4">
                    <span className="font-sans text-[11px] text-cream-muted min-w-[72px] text-right">{l}</span>
                    <div className="flex-1 h-[3px] bg-white/[.06] rounded-full overflow-hidden">
                      <div className="stat-bar-fill" data-width={w} />
                    </div>
                    <span className="font-sans text-[10.5px] text-cream-muted min-w-[32px] font-500">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              ['55M', 'Population Within 2-Hour Drive', 'The largest consumer catchment of any single retail property on Earth — greater NY, NJ, CT, and Philadelphia markets combined.'],
              ['$138K', 'Average Household Income', 'Visitors index significantly above national HHI averages; 42% earn over $150K — an exceptionally premium consumer audience.'],
              ['62%', 'Millennials & Gen Z', 'The most commercially active, brand-conscious, and experience-seeking demographic in the global consumer economy.'],
              ['38%', 'International Visitors', 'Three international airports within 30 minutes. International visitors represent the highest-spending retail demographic — and they arrive intending to shop.'],
              ['4.8H', 'Average Dwell Time', "More than double the national mall average of 2.1H. Every brand here benefits from an audience that has decided to stay."],
            ].map(([n, title, body], i) => (
              <div key={n} className={`reveal delay-${i + 2} flex gap-5 bg-ink-3 p-5 border-l-2 border-gold hover:translate-x-1 transition-transform duration-300`}>
                <div className="font-display text-[28px] font-light text-gold min-w-[72px] leading-none mt-0.5">{n}</div>
                <div>
                  <div className="font-sans text-[13px] font-500 mb-1">{title}</div>
                  <div className="font-sans font-light text-[11.5px] text-cream-muted leading-relaxed">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: CTA Section
   ============================================================ */
function CTASection({ onCTA }) {
  const ref = useReveal();
  return (
    <section id="cta" className="relative overflow-hidden" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }} ref={ref}>
      <img src={IMAGES.cta} alt="American Dream" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(.18)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,9,.95) 0%, rgba(8,8,9,.55) 100%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-12 py-32">
        <div className="max-w-3xl">
          <div className="reveal flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-gold" />
            <span className="font-syne text-[9px] font-600 tracking-[.35em] uppercase text-gold">The Next Step</span>
          </div>
          <h2 className="reveal delay-1 font-display font-light leading-[.88] tracking-tight mb-8" style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}>
            Your Brand<br /><em className="text-gold">Belongs</em><br />Here.
          </h2>
          <p className="reveal delay-2 font-sans font-light text-cream-muted text-[16px] leading-[1.85] max-w-md mb-14">
            The world's most valuable commercial stage has limited availability. Let's talk about your opportunity before someone else takes it.
          </p>
          <div className="reveal delay-3 flex flex-wrap gap-3 mb-16">
            <button onClick={() => onCTA('contact')} className="cta-btn-primary px-10 py-4 text-[10px] cursor-none"><span>Schedule a Briefing</span></button>
            <button onClick={() => onCTA('lease')} className="cta-btn-outline px-10 py-4 text-[10px] cursor-none">Lease a Space</button>
            <button onClick={() => onCTA('event')} className="cta-btn-outline px-10 py-4 text-[10px] cursor-none">Book an Event</button>
            <button onClick={() => onCTA('sponsor')} className="cta-btn-outline px-10 py-4 text-[10px] cursor-none">Partner With Us</button>
          </div>
          <div className="reveal delay-4 grid grid-cols-3 gap-[2px]">
            {[
              { role: 'Retail Leasing', name: 'Sarah Mitchell', email: 's.mitchell@americandream.com' },
              { role: 'Events & Sponsorship', name: 'James Carrington', email: 'j.carrington@americandream.com' },
              { role: 'Brand Partnerships', name: 'Elena Vasquez', email: 'e.vasquez@americandream.com' },
            ].map(c => (
              <div key={c.role} className="bg-ink/80 backdrop-blur-sm border border-white/[.07] p-7">
                <div className="font-syne text-[8px] font-700 tracking-[.25em] uppercase text-gold mb-3">{c.role}</div>
                <div className="font-sans text-[15px] font-500 mb-1.5">{c.name}</div>
                <div className="font-sans text-[11.5px] text-cream-muted font-light">{c.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENT: Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[.06] py-10 px-12">
      <div className="max-w-[1340px] mx-auto flex items-center justify-between flex-wrap gap-6">
        <div>
          <div className="font-display text-gold text-[17px] tracking-[.2em] uppercase">American Dream</div>
          <div className="font-syne text-[8px] tracking-[.4em] text-cream-dim uppercase mt-0.5">East Rutherford · New Jersey</div>
        </div>
        <div className="flex gap-8">
          {['Property', 'Retail', 'Events', 'Partners', 'Leasing'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="font-syne text-[9px] tracking-[.15em] uppercase text-cream-dim hover:text-cream-muted transition-colors">{l}</a>
          ))}
        </div>
        <div className="font-sans text-[10px] text-cream-dim">© 2025 American Dream Meadowlands</div>
      </div>
    </footer>
  );
}

/* ============================================================
   COMPONENT: Video Lightbox
   ============================================================ */
function VideoLightbox({ videoId, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative">
        <button onClick={onClose} className="absolute -top-12 right-0 text-cream-muted hover:text-cream text-2xl font-light cursor-none transition-colors">✕ Close</button>
        <div className="lightbox-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENT: Contact Modal
   ============================================================ */
function ContactModal({ type, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const configs = {
    contact: { title: 'Schedule a Briefing', sub: 'Our team will prepare a custom presentation within 48 hours.' },
    lease: { title: 'Leasing Inquiry', sub: 'Tell us your space requirements and our leasing team will prepare a proposal.' },
    event: { title: 'Event Booking', sub: 'Book one of four world-class venues. We respond within 24 hours.' },
    sponsor: { title: 'Partnership Inquiry', sub: 'Explore sponsorship and brand partnership opportunities.' },
  };
  const cfg = configs[type] || configs.contact;

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, []);

  if (submitted) return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box p-16 text-center">
        <div className="w-14 h-14 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
        <div className="font-display text-[30px] font-light mb-3">Inquiry Received</div>
        <p className="font-sans font-light text-cream-muted text-[13px] leading-relaxed max-w-sm mx-auto mb-8">Thank you for your interest. A member of our commercial team will be in touch within 24 hours to discuss your opportunity.</p>
        <button onClick={onClose} className="cta-btn-primary px-10 py-3 text-[9px] cursor-none"><span>Close</span></button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box p-12 relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-cream-dim hover:text-cream text-xl cursor-none transition-colors">✕</button>
        <div className="font-syne text-[8.5px] tracking-[.3em] uppercase text-gold mb-3">American Dream</div>
        <h3 className="font-display text-[30px] font-light mb-1.5">{cfg.title}</h3>
        <p className="font-sans font-light text-cream-muted text-[12px] mb-8">{cfg.sub}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label>First Name</label><input type="text" placeholder="Alexandra" /></div>
          <div><label>Last Name</label><input type="text" placeholder="Chen" /></div>
        </div>
        <div className="mb-4"><label>Company</label><input type="text" placeholder="Brand / Agency / Firm" /></div>
        <div className="mb-4"><label>Email</label><input type="email" placeholder="email@company.com" /></div>
        <div className="mb-4">
          <label>Area of Interest</label>
          <select>
            {type === 'lease' && <><option>Flagship / Anchor Retail</option><option>Luxury Wing</option><option>F&B</option><option>Pop-Up / Short Term</option></>}
            {type === 'event' && <><option>Concert / Music</option><option>Corporate Summit</option><option>Brand Activation</option><option>Product Launch</option><option>Trade Show / Expo</option></>}
            {type === 'sponsor' && <><option>Platinum Partner ($5M+)</option><option>Gold Partner ($2M+)</option><option>Brand Partner ($500K+)</option><option>Custom</option></>}
            {type === 'contact' && <><option>General Inquiry</option><option>Retail Leasing</option><option>Event Booking</option><option>Partnership</option></>}
          </select>
        </div>
        <div className="mb-6"><label>Message</label><textarea rows="3" placeholder="Tell us about your goals and timeline..." /></div>
        <button onClick={() => setSubmitted(true)} className="cta-btn-primary w-full py-3.5 text-[9px] cursor-none"><span>Submit Inquiry</span></button>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
function App() {
  const [loaded, setLoaded] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [modal, setModal] = useState(null);

  const openVideo = useCallback((id) => setVideoId(id), []);
  const openCTA = useCallback((type) => setModal(type), []);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <ProgressBar />
      <Nav onCTA={openCTA} />
      <DotNav />

      <main>
        <Hero onCTA={openCTA} />
        <MarqueeStrip />
        <Stats />
        <ShowcaseGrid onPlay={openVideo} />
        <Overview />
        <Retail onCTA={openCTA} />
        <Attractions />
        <Events onPlay={openVideo} onCTA={openCTA} />
        <Sponsorship onCTA={openCTA} />
        <Leasing onCTA={openCTA} />
        <Demographics />
        <CTASection onCTA={openCTA} />
      </main>

      <Footer />

      {videoId && <VideoLightbox videoId={videoId} onClose={() => setVideoId(null)} />}
      {modal && <ContactModal type={modal} onClose={() => setModal(null)} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
