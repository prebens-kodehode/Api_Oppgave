import { mainContainer } from "../htmlElements.js";
import { makeElement } from "../utils/makeElement.js";

export function renderPokemonList(pokemon, details) {
  const pokemonWrapper = makeElement("div", { className: "pokemon-card" });
  const pokemonTitle = makeElement("h2", { textContent: pokemon.name, className: "pokemon-title" });
  const pokemonStats = makeElement("div", { className: "pokemon-stats" });
  const pokemonButton = makeElement("button", {
    textContent: "Click for details",
  });

  pokemonButton.addEventListener("click", () => {
    navState = "details";
    navigate(pokemon.url);
  });

  const image = makeElement("img", {
    src: details.sprites.other.dream_world.front_default,
    className: "pokemon-image",
    alt: "pokemon-image",
  });

  const pokemonDetails = details.stats.map(({ base_stat, stat }) => {
    const container = makeElement("div");
    const statName = makeElement("p", { textContent: stat.name });
    const statValue = makeElement("p", { textContent: base_stat });
    container.append(statName, statValue);

    return container;
  });

  pokemonStats.append(...pokemonDetails);

  pokemonWrapper.append(pokemonTitle, image, pokemonStats, pokemonButton);

  mainContainer.append(pokemonWrapper);
}
