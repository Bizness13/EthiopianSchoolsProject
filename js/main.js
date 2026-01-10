
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  $$('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

  const header = $('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = $('[data-mobile-toggle]');
  const panel = $('[data-mobile-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    
    $$('a', panel).forEach((a) =>
      a.addEventListener('click', () => {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  const counters = $$('[data-count-to]');
  if (counters.length) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animate = (el) => {
      const to = Number(el.getAttribute('data-count-to') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = prefersReduced ? 0 : 900;
      const start = performance.now();
      const from = 0;
      const step = (t) => {
        const p = duration === 0 ? 1 : Math.min(1, (t - start) / duration);
        const val = Math.round(from + (to - from) * (p * (2 - p))); 
        el.textContent = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const seen = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !seen.has(e.target)) {
            seen.add(e.target);
            animate(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    counters.forEach((c) => io.observe(c));
  }

  const carousel = $('[data-carousel]');
  if (carousel) {
    const track = $('[data-carousel-track]', carousel);
    const slides = $$('[data-slide]', carousel);
    const dots = $$('[data-dot]', carousel);
    const prev = $('[data-prev]', carousel);
    const next = $('[data-next]', carousel);
    let idx = 0;
    let timer = null;

    const update = () => {
      if (!track) return;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
    };

    const go = (i) => {
      idx = (i + slides.length) % slides.length;
      update();
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => go(idx + 1), 6000);
    };
    const stop = () => timer && window.clearInterval(timer);

    if (prev) prev.addEventListener('click', () => go(idx - 1));
    if (next) next.addEventListener('click', () => go(idx + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    update();
    start();
  }

  const map = $('[data-map]');
  if (map) {
    const tooltip = $('[data-tooltip]', map);
    const btns = $$('[data-hotspot]', map);

    const close = () => tooltip && tooltip.classList.remove('open');

    const open = (btn) => {
      if (!tooltip) return;
      const title = btn.getAttribute('data-title') || 'Region';
      const copy = btn.getAttribute('data-copy') || '';
      const x = Number(btn.getAttribute('data-x') || '50');
      const y = Number(btn.getAttribute('data-y') || '50');
      tooltip.innerHTML = `<strong>${title}</strong><p>${copy}</p>`;
      tooltip.style.left = `${Math.min(92, Math.max(8, x))}%`;
      tooltip.style.top = `${Math.min(92, Math.max(8, y))}%`;
      tooltip.classList.add('open');
    };

    btns.forEach((b) => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        open(b);
      });
      b.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(b);
        }
        if (e.key === 'Escape') close();
      });
    });

    document.addEventListener('click', (e) => {
      if (!tooltip) return;
      if (!map.contains(e.target)) close();
    });
  }

  const bar = $('[data-sticky-donate]');
  if (bar) {
    const amountBtns = $$('[data-amount]', bar);
    const goDonate = $('[data-go-donate]', bar);

    const setSelected = (amount) => {
      amountBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-amount') === amount));
      if (goDonate) {
        const url = new URL(goDonate.getAttribute('href') || 'donate.html', window.location.href);
        if (amount && amount !== 'custom') url.searchParams.set('amount', amount);
        goDonate.setAttribute('href', url.pathname + url.search);
      }
    };

    amountBtns.forEach((b) =>
      b.addEventListener('click', () => {
        setSelected(b.getAttribute('data-amount') || '');
      })
    );
    setSelected('50');
  }

  const calc = $('[data-calculator]');
  if (calc) {
    const range = $('[data-range]', calc);
    const value = $('[data-value]', calc);
    const impact = $('[data-impact]', calc);

    const impacts = [
      { min: 0, text: (amt) => `Your $${amt} helps cover essential supplies where they’re needed most.` },
      { min: 25, text: (amt) => `Your $${amt} can provide learning materials for a student.` },
      { min: 50, text: (amt) => `Your $${amt} can provide textbooks for about 5 students.` },
      { min: 100, text: (amt) => `Your $${amt} can help fund classroom materials and teacher resources.` },
      { min: 250, text: (amt) => `Your $${amt} can contribute to a classroom improvement project.` },
    ];

    const render = (amt) => {
      if (value) value.textContent = `$${amt}`;
      const best = impacts.reduce((a, b) => (amt >= b.min ? b : a), impacts[0]);
      if (impact) impact.textContent = best.text(amt);
    };

    const url = new URL(window.location.href);
    const preset = url.searchParams.get('amount');
    if (preset && range) range.value = String(Math.min(500, Math.max(10, Number(preset))));
    render(Number(range ? range.value : 50));

    if (range) {
      range.addEventListener('input', () => render(Number(range.value)));
    }
  }
})();
