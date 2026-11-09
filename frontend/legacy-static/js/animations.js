let ctx;

export function initAnimations() {
  ctx = gsap.context(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.section');
    const overlay = document.querySelector('.transition-overlay');
    if (!sections.length || !overlay) return;

    sections.forEach((section, i) => {
      if (i === 0) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top 45%',
        toggleActions: 'play none none none',
        onEnter: () => {
          const prev = sections[i - 1];
          if (!prev) return;

          prev.inert = true;
          const focusable = prev.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
          focusable.forEach((el) => el.setAttribute('tabindex', '-1'));

          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onComplete: () => {
              prev.inert = false;
              focusable.forEach((el) => el.removeAttribute('tabindex'));
            },
          });

          tl.to(prev, {
            scale: 1.12,
            opacity: 0,
            filter: 'blur(4px)',
            duration: 0.35,
            ease: 'power2.in',
          })
          .to(overlay, {
            opacity: 1,
            duration: 0.08,
          })
          .to(overlay, {
            opacity: 0,
            duration: 0.08,
          })
          .fromTo(
            section,
            {
              scale: 1.05,
              opacity: 0.5,
              filter: 'blur(2px)',
            },
            {
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.5,
              ease: 'power2.out',
            },
            '+=0.02'
          );
        },
      });
    });

    sections.forEach((section) => {
      const content = section.querySelector('.section__content');
      if (!content) return;

      gsap.fromTo(
        content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });

  // Refresh ScrollTrigger on resize to handle breakpoint changes
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });
}

export function destroyAnimations() {
  if (ctx) {
    ctx.revert();
    ctx = null;
  }
}
