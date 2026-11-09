const FSM = {
  IDLE: 'IDLE',
  WALKING: 'WALKING',
  STOPPING: 'STOPPING',
};

let fsmState = FSM.IDLE;
let characterEl = null;
let ctx = null;
let walkTween = null;

export function initWalkCycle() {
  characterEl = document.getElementById('walk-character');
  if (!characterEl) return;

  ctx = gsap.context(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionsContainer = document.querySelector('.sections-container');
    const totalScroll = sectionsContainer.scrollHeight - sectionsContainer.clientHeight;

    walkTween = gsap.to(characterEl, {
      x: '75vw',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionsContainer,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        scrub: 1.5,
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          updateFSM(velocity);
        },
      },
    });
  });

  characterEl.classList.add('character--idle');
}

function updateFSM(velocity) {
  if (!characterEl) return;

  if (velocity > 30 && fsmState !== FSM.WALKING) {
    fsmState = FSM.WALKING;
    characterEl.classList.remove('character--idle');
    if (!characterEl.classList.contains('character--visible')) {
      characterEl.classList.add('character--visible');
    }
  } else if (velocity < 5 && fsmState === FSM.WALKING) {
    fsmState = FSM.STOPPING;
    characterEl.classList.add('character--idle');
    setTimeout(() => {
      if (fsmState === FSM.STOPPING) fsmState = FSM.IDLE;
    }, 400);
  }
}

export function destroyWalkCycle() {
  if (ctx) {
    ctx.revert();
    ctx = null;
  }
  walkTween = null;
  characterEl = null;
}
