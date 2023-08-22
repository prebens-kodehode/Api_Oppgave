import { mainContainer } from "../htmlElements.js";
import { makeElement } from "../utils/makeElement.js";
import { typeGradients } from "../data/data.js";

export function renderPokemonList(pokemon, details, colors) {
  const pokemonWrapper = makeElement("div", { className: "pokemon-card" });
  pokemonWrapper.style.background =
    typeGradients[details.types[0].type.name].card;
  const pokemonTitle = makeElement("h2", {
    textContent: pokemon.name,
    className: "pokemon-title",
  });
  const pokemonStats = makeElement("div", { className: "pokemon-stats" });
  const pokemonButton = makeElement("button", {
    textContent: "Click for details",
  });

  pokemonButton.addEventListener("click", () => {
    navState = "details";
    navigate(pokemon.url);
  });

  const imageContainer = makeElement("div", { className: "image-container" });
  imageContainer.style.background =
    typeGradients[details.types[0].type.name].image;
  const image = makeElement("img", {
    src: details.sprites.other.dream_world.front_default,
    className: "pokemon-image",
    alt: "pokemon-image",
  });

  const pokemonDetails = details.stats.map(({ base_stat, stat }) => {
    const container = makeElement();
    const statName = makeElement("p", {
      textContent: stat.name,
      className: "stat-name",
    });
    const statValue = makeElement("p", {
      textContent: base_stat,
      className: "base-stat",
    });
    container.append(statName, statValue);

    return container;
  });

  pokemonStats.append(...pokemonDetails);
  imageContainer.append(image);
  pokemonWrapper.append(
    pokemonTitle,
    imageContainer,
    pokemonStats,
    pokemonButton
  );

  mainContainer.append(pokemonWrapper);
}
