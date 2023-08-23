import { getData } from "./data/api.js";
import { makeElement } from "./utils/makeElement.js";
import { cardWrapper } from "./htmlElements.js";
import { renderPokemonDetails } from "./pages/pokemonDetails.js";
import { renderPokemonList } from "./pages/pokemonList.js";

// API constants:
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

let navState = "main";

async function navigate(url) {
  try {
    const data = await getData(url);

    cardWrapper.innerHTML = "";

    if (navState === "main") {
      const pokemonList = data.results;
      await Promise.all(
        pokemonList.map(async (pokemon) => {
          try {
            const details = await getData(pokemon.url);
            renderPokemonList(pokemon, details);
          } catch (error) {
            console.error("Error rendering pokemon list:", error);
          }
        })
      );
    } else {
      renderPokemonDetails(data);
    }
  } catch (error) {
    console.error("Error navigating:", error);
  }
}

navState = "main";
navigate("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=386");
