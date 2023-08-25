import { getData } from "../data/api.js";

export function makeElement(type = "div", props = {}) {
  const element = document.createElement(type);
  Object.entries(props).forEach(([key, value]) => (element[key] = value)); // convert props object into an array, then destructure the array into key value pairs, and assign these properties to the elements

  return element;
}

export async function fetchAbilityDetails(pokemon) {
  try {
    // extract the ability URLs from the Pokémon object
    const abilityUrls = pokemon.abilities.map(
      (abilityObj) => abilityObj.ability.url
    );

    // fetch data for each ability
    const abilityDetailsPromises = abilityUrls.map((url) => getData(url));

    // wait for all the promises to resolve and get the ability details
    const rawAbilitiesDetails = await Promise.all(abilityDetailsPromises);

    // extract only the name and short_effect in English
    const abilitiesDetails = rawAbilitiesDetails.map((ability) => {
      const englishEffect = ability.effect_entries.find(
        (entry) => entry.language.name === "en"
      );
      return {
        name: ability.name,
        short_effect: englishEffect
          ? englishEffect.short_effect
          : "Effect not available",
      };
    });

    // return array of ability details
    return abilitiesDetails;
  } catch (error) {
    console.error("Error fetching and processing ability details:", error);
  }
}
