document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (btn && links) {
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? '×' : '☰';
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = '☰';
      });
    });
  }


  // Interactive hero name: a subtle cursor-following gradient highlight.
  const heroName = document.querySelector('.hero-name');
  const hero = document.querySelector('.hero');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (heroName && canHover) {
    heroName.addEventListener('pointermove', (event) => {
      const rect = heroName.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      heroName.style.setProperty('--mx', `${Math.max(0, Math.min(100, x))}%`);
      heroName.classList.add('is-hovering');
    });

    heroName.addEventListener('pointerleave', () => {
      heroName.classList.remove('is-hovering');
      heroName.style.removeProperty('--mx');
    });
  }

  // Very subtle hero-photo parallax on desktop.
  if (hero && canHover) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      hero.style.setProperty('--hero-x', `${x.toFixed(2)}px`);
      hero.style.setProperty('--hero-y', `${y.toFixed(2)}px`);
    });

    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--hero-x', '0px');
      hero.style.setProperty('--hero-y', '0px');
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
});
