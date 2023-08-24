const tiltEffectSettings = {
  max: 20, // max tilt rotation(deg)
  perspective: 1000, // transform perspective(px)
  scale: 1.1, // transform scale
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

  //cards positions relative to viewport
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

  //moves the box-shadow around according to the card tilt (not very realistic , but better than a static shadow)
  const boxShadowX = Math.min(Math.max(rotateX * 0.15, -1), 1);
  const boxShadowY = Math.min(Math.max(rotateY * 0.15 * -1, -1), 1);

  //increases box-shadow blur according to how much the card tilts (this is also not very realistic)
  const boxShadowXPositive = Math.max(Math.abs(boxShadowX), 0.6);
  const boxShadowYPositive = Math.max(Math.abs(boxShadowY), 0.6);
  const boxShadowBlur = Math.max(boxShadowXPositive, boxShadowYPositive) * 3;

  //adds rotation and shadow to the cards
  card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                           scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
  card.style.boxShadow = `${boxShadowY}rem ${boxShadowX}rem ${boxShadowBlur}rem rgb(32, 32, 32, 0.7)`;
}

//resets styling
function cardMouseLeave(event) {
  event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  event.currentTarget.style.boxShadow = `0.3rem 0.3rem 0.6rem rgb(32, 32, 32, 0.7)`;
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
