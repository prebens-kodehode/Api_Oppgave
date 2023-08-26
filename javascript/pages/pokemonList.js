import { cardWrapper } from "../htmlElements.js";
import { makeElement } from "../utils/functions.js";
import { typeGradients } from "../data/data.js";
import { tiltEventListeners } from "../utils/cardTilt.js";
import { detailsEventListeners } from "./pokemonDetails.js";

export function renderPokemonList(pokemon) {
  const pokemonWrapper = makeElement("div", { className: "pokemon-card" });
  pokemonWrapper.dataset.name = pokemon.name;
  pokemonWrapper.style.background =
    typeGradients[pokemon.types[0].type.name].card;

  const pokemonTitleContainer = makeElement("h2", {
    className: "pokemon-title-container",
  });
  const pokemonTitle = makeElement("h2", {
    textContent: pokemon.name,
    className: "pokemon-title",
  });

  const imageContainer = makeElement("div", { className: "image-container" });
  imageContainer.style.background =
    typeGradients[pokemon.types[0].type.name].image;
  const image = makeElement("img", {
    src: pokemon.sprites.other.dream_world.front_default,
    className: "pokemon-image",
    alt: `${pokemon.name}`,
  });

  const pokemonStats = makeElement("div", { className: "pokemon-stats" });

  const sizeContainer = makeElement("div", { className: "size-container" });
  const height = makeElement("p", { textContent: `Height: ${pokemon.height}` });
  const weight = makeElement("p", { textContent: `Weight: ${pokemon.weight}` });
  sizeContainer.append(height, weight);

  const pokemonDetails = pokemon.stats.map(({ base_stat, stat }) => {
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

  pokemonTitleContainer.append(pokemonTitle);
  pokemonStats.append(sizeContainer, ...pokemonDetails);
  imageContainer.append(image);
  pokemonWrapper.append(pokemonTitleContainer, imageContainer, pokemonStats);

  tiltEventListeners(pokemonWrapper);
  detailsEventListeners(pokemonWrapper, pokemon);

  pokemonWrapper.classList.add("card-fade-in");
  cardWrapper.append(pokemonWrapper);
}
