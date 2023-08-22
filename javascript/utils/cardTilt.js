const tiltEffectSettings = {
  max: 15, // max tilt rotation(deg)
  perspective: 1000, // transform perspective(px)
  scale: 1.05, // transform scale
  speed: 2000, // speed (transition-duration) of the enter/exit transition (ms)
  easing: "cubic-bezier(.03,.98,.52,.99)", // easing of the enter/exit transition
};

export function cardEventListeners(card) {
  card.addEventListener("mouseenter", cardMouseEnter);
  card.addEventListener("mousemove", cardMouseMove);
  card.addEventListener("mouseleave", cardMouseLeave);
}

function cardMouseEnter(event) {
  setTransition(event);
}

function cardMouseMove(event) {
  const card = event.currentTarget;
  const cardRect = card.getBoundingClientRect();
  const cardCenterX = cardRect.left + card.offsetWidth / 2;
  const cardCenterY = cardRect.top + card.offsetHeight / 2;

  const mouseX = event.clientX - cardCenterX;
  const mouseY = event.clientY - cardCenterY;

  const rotateX =
    (+1 * tiltEffectSettings.max * mouseY) / (card.offsetHeight / 2);
  const rotateY =
    (-1 * tiltEffectSettings.max * mouseX) / (card.offsetWidth / 2);

  card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                          scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;

  console.log(cardWidth, cardHeight);
}

function cardMouseLeave(event) {
  event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  setTransition(event);
}

function setTransition(event) {
  const card = event.currentTarget;
  clearTimeout(card.transitionTimeoutId);
  card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
  card.transitionTimeoutId = setTimeout(() => {
    card.style.transition = "";
  }, tiltEffectSettings.speed);
}
