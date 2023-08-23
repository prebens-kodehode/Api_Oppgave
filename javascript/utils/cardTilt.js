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

  const dropShadowX = Math.min(Math.max(rotateX * 0.15, -1), 1);
  const dropShadowY = Math.min(Math.max(rotateY * 0.15 * -1, -1), 1);

  // const dropShadowSpread = 0;
  // const dropShadowXPositive = 0;
  // const dropShadowYPositive = 0;
  // if (dropShadowX > 0) {
  //   dropShadowXPositive = dropShadowX;
  // } else if (dropShadowX < 0) {
  //   dropShadowXPositive = dropShadowX * -1;
  // } else {
  //   dropShadowXPositive = 0;
  // }
  // if (dropShadowY > 0) {
  //   dropShadowYPositive = dropShadowY;
  // } else if (dropShadowY < 0) {
  //   dropShadowYPositive = dropShadowY * -1;
  // } else {
  //   dropShadowYPositive = 0;
  // }

  // if (dropShadowXPositive > dropShadowYPositive) {
  //   dropShadowSpread = dropShadowXPositive;
  // } else if (dropShadowXPositive < dropShadowYPositive) {
  //   dropShadowSpread = dropShadowYPositive;
  // } else {
  //   dropShadowSpread = 0;
  // }

  const dropShadowXPositive = Math.max(Math.abs(dropShadowX) * 1.3, 0.6);
  const dropShadowYPositive = Math.max(Math.abs(dropShadowY) * 1.3, 0.6);
  const dropShadowSpread = Math.max(dropShadowXPositive, dropShadowYPositive);

  card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                           scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
  card.style.filter = `drop-shadow(${dropShadowY}rem ${dropShadowX}rem ${dropShadowSpread}rem rgb(32, 32, 32, 0.7))`;
  console.log(dropShadowSpread);
}

function cardMouseLeave(event) {
  event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  event.currentTarget.style.filter = `drop-shadow(0.3rem 0.3rem 0.6rem rgb(32, 32, 32, 0.7))`;
  setTransition(event);
}

function setTransition(event) {
  const card = event.currentTarget;
  clearTimeout(card.transitionTimeoutId);
  card.style.transition = `${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
  card.transitionTimeoutId = setTimeout(() => {
    card.style.transition = "";
  }, tiltEffectSettings.speed);
}
