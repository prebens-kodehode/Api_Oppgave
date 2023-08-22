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
  const cardWidth = card.offsetWidth;
  const cardHeight = card.offsetHeight;
  const centerX = card.offsetLeft + cardWidth / 2;
  const centerY = card.offsetTop + cardHeight / 2;
  const mouseX = event.clientX - centerX;
  const mouseY = event.clientY - centerY;
  const rotateX = (+1 * tiltEffectSettings.max * mouseY) / (cardHeight / 2);
  const rotateY = (-1 * tiltEffectSettings.max * mouseX) / (cardWidth / 2);

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
