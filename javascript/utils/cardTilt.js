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

  //calculates the mid point of the card
  const cardCenterX = cardRect.left + card.offsetWidth / 2;
  const cardCenterY = cardRect.top + card.offsetHeight / 2;

  //calculates mouse position relative to card center
  const mouseX = event.clientX - cardCenterX;
  const mouseY = event.clientY - cardCenterY;

  //rotates card relative to mouse position
  const rotateX =
    (+1 * tiltEffectSettings.max * mouseY) / (card.offsetHeight / 2);
  const rotateY =
    (-1 * tiltEffectSettings.max * mouseX) / (card.offsetWidth / 2);

  //moves the drop-shadow around according to the card tilt
  const dropShadowX = Math.min(Math.max(rotateX * 0.15, -1), 1);
  const dropShadowY = Math.min(Math.max(rotateY * 0.15 * -1, -1), 1);

  //increases drop-shadow blur(spread) according to how much the card tilts (this isn't really realistic, but looks better than no dynamic blur)
  const dropShadowXPositive = Math.max(Math.abs(dropShadowX) * 1.3, 0.6);
  const dropShadowYPositive = Math.max(Math.abs(dropShadowY) * 1.3, 0.6);
  const dropShadowBlur = Math.max(dropShadowXPositive, dropShadowYPositive);

  //adds rotation and shadow to the cards
  card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                           scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
  card.style.filter = `drop-shadow(${dropShadowY}rem ${dropShadowX}rem ${dropShadowBlur}rem rgb(32, 32, 32, 0.7))`;
}

function cardMouseLeave(event) {
  event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  event.currentTarget.style.filter = `drop-shadow(0.3rem 0.3rem 0.6rem rgb(32, 32, 32, 0.7))`;
  setTransition(event);
}

//sets the mouse enter/exit transition effect
function setTransition(event) {
  const card = event.currentTarget;
  clearTimeout(card.transitionTimeoutId);
  card.style.transition = `${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
  card.transitionTimeoutId = setTimeout(() => {
    card.style.transition = "";
  }, tiltEffectSettings.speed);
}
