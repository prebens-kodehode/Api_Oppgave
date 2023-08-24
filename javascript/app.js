import { getData } from "./data/api.js";
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

      // creates an array of promises for fetching and rendering to avoid rendering pokemon in the wrong order
      const renderingPromises = pokemonList.map(async (pokemon) => {
        try {
          const details = await getData(pokemon.url);
          return { pokemon, details };
        } catch (error) {
          console.error("Error fetching details for:", pokemon.name, error);
          return null;
        }
      });

      // fetch and render in order
      for (const renderingPromise of renderingPromises) {
        const renderingData = await renderingPromise;
        if (renderingData) {
          renderPokemonList(renderingData.pokemon, renderingData.details);
        }
      }
    } else {
      renderPokemonDetails(data);
    }
  } catch (error) {
    console.error("Error navigating:", error);
  }
}

navState = "main";
navigate("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=180");
