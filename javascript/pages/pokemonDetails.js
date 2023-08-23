import { cardWrapper } from "../htmlElements.js";
import { makeElement } from "../utils/makeElement.js";

export function renderPokemonDetails(pokemon) {
  const wrapper = makeElement();
  const title = makeElement("h3", { textContent: pokemon.name });
  const image = makeElement("img", {
    src: pokemon.sprites.other.dream_world.front_default,
    className: "pokemon-image",
  });

  const statsData = pokemon.stats.map(({ base_stat, stat }) => {
    const container = makeElement();
    const statName = makeElement("p", { textContent: stat.name });
    const statValue = makeElement("span", { textContent: base_stat });

    container.append(statName, statValue);
    return container;
  });

  wrapper.append(title, image, ...statsData); // ... pakker ut elementer fra arrray, og gjør det om til bare komma separerte verdier

  cardWrapper.append(wrapper);
}
