import { getData } from "../data/api.js";

/**
 * Creates a DOM element of the specified type and sets its properties based on the provided props object.
 *
 * @param {string} [type="div"] - The type of DOM element to create.
 * @param {Object} [props={}] - An object containing properties to set on the created element. Keys are property names and values are the property values.
 * @returns {Element} - The created DOM element with assigned properties.
 */
export function makeElement(type = "div", props = {}) {
  const element = document.createElement(type);
  Object.entries(props).forEach(([key, value]) => (element[key] = value)); // convert props object into an array, then destructure the array into key value pairs, and assign these properties to the elements

  return element;
}

/**
 * Fetches and processes the details of a pokemon's abilities.
 *
 * This function extracts the ability URLs from the given pokemon object,
 * fetches data for each ability, and then maps the raw ability data to
 * an array of objects containing the name and short effect (in English) of each ability.
 *
 * @param {Object} pokemon - The pokemon object containing ability data.
 * @param {Array} pokemon.abilities - An array of ability objects associated with the pokemon.
 * @returns {Promise<Array<{name: string, short_effect: string}>>} An array of objects with each object containing the name and short effect of an ability. Returns an empty array if an error occurs.
 * @throws {Error} Throws an error if there's an issue fetching or processing the ability details.
 */
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

/**
 * update classes of a DOM element by adding or removing specific class names.
 *
 * @param {Element} element - the DOM element to update.
 * @param {string[]} [add=[]] - an array of class names to add to the element.
 * @param {string[]} [remove=[]] - an array of class names to remove from the element.
 * @returns {void}
 */
export function updateClasses(element, add = [], remove = []) {
  add.forEach((cls) => element.classList.add(cls));
  remove.forEach((cls) => element.classList.remove(cls));
}

/**
 * returns a promise that resolves after the specified number of milliseconds.
 *
 * @param {number} ms - number of milliseconds to wait.
 * @returns {Promise<void>} promise that resolves after the specified delay.
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * fades out all elements with the class "pokemon-card" and waits for 500ms.
 *
 * @returns {Promise<void>} promise that resolves after the fade out and delay have completed.
 */
export async function cardsFadeOut() {
  const pokemonCards = document.querySelectorAll(".pokemon-card");
  pokemonCards.forEach((card) => {
    updateClasses(card, ["card-fade-out"], ["card-fade-in"]);
  });
  await delay(500);
}
