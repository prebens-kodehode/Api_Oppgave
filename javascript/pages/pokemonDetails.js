import { modal, modalInfoWrapper } from "../htmlElements.js";
import { fetchAbilityDetails, makeElement } from "../utils/functions.js";
import { typeGradients } from "../data/data.js";

export function detailsEventListeners(card, pokemon) {
  card.addEventListener("click", () => {
    renderPokemonDetails(pokemon);

    modalInfoWrapper.classList.remove("fade-out");
    modalInfoWrapper.classList.add("fade-in");
    modal.classList.remove("modal-hidden");
    modal.classList.add("modal-visible");
  });
}

export async function renderPokemonDetails(pokemon) {
  modalInfoWrapper.style.background =
    typeGradients[pokemon.types[0].type.name].card;

  const pokemonTitle = makeElement("h1", { textContent: pokemon.name });

  const imageContainer = makeElement("div", {
    className: "modal-image-container",
  });
  imageContainer.style.background =
    typeGradients[pokemon.types[0].type.name].image;

  const image = makeElement("img", {
    src: pokemon.sprites.other.dream_world.front_default,
    className: "modal-image",
    alt: `${pokemon.name}`,
  });

  imageContainer.append(image);

  const sizeContainer = makeElement("div", {
    className: "modal-size-container",
  });
  const height = makeElement("p", { textContent: `Height: ${pokemon.height}` });
  const weight = makeElement("p", { textContent: `Weight: ${pokemon.weight}` });
  sizeContainer.append(height, weight);

  const typeContainer = makeElement("div", { className: "type-container" });
  const typeTitle = makeElement("h2", { textContent: "Type" });

  const pokemonTypes = pokemon.types.map(({ type }) => {
    const container = makeElement();
    const typeName = makeElement("h3", {
      textContent: type.name,
      className: "type",
    });
    typeName.style.background = typeGradients[type.name].image;
    container.append(typeName);

    return container;
  });

  typeContainer.append(typeTitle, ...pokemonTypes);

  const pokemonDetails = pokemon.stats.map(({ base_stat, stat }) => {
    const container = makeElement();
    const statName = makeElement("p", {
      textContent: stat.name,
      className: "modal-stat-name",
    });
    const statValue = makeElement("p", {
      textContent: base_stat,
      className: "modal-base-stat",
    });
    container.append(statName, statValue);

    return container;
  });

  const abilityContainer = makeElement("div", {
    className: "ability-container",
  });

  try {
    // 1. Retrieve Ability Details:
    const abilitiesDetails = await fetchAbilityDetails(pokemon); // <-- await the asynchronous function

    // 2. Render Ability Details:
    const abilitiesElements = abilitiesDetails.map(({ name, short_effect }) => {
      const abilityDiv = makeElement();
      const abilityName = makeElement("h2", { textContent: name });
      const abilityEffect = makeElement("p", { textContent: short_effect });
      abilityDiv.append(abilityName, abilityEffect);
      return abilityDiv;
    });

    abilityContainer.append(...abilitiesElements);
  } catch (error) {
    console.error("Error rendering ability details:", error);
  }
  // retrieve data from fetchAbilityDetails(pokemon) here (or a better suited spot) and make an h2 element with the ability name and
  // a p element with the short_effect and then append each of those to a div for each ability and lastly append those divs to abilityContainer
  modalInfoWrapper.innerHTML = "";
  modalInfoWrapper.append(
    pokemonTitle,
    imageContainer,
    typeContainer,
    sizeContainer,
    ...pokemonDetails,
    abilityContainer
  ); // ... pakker ut elementer fra arrray, og gjør det om til bare komma separerte verdier
}
