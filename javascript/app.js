import { getData } from "./data/api.js";
import { cardWrapper, searchInput } from "./htmlElements.js";
import { renderPokemonDetails } from "./pages/pokemonDetails.js";
import { renderPokemonList } from "./pages/pokemonList.js";

// API constants:
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonListURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
let pokemonData = [];
async function catchPokemon() {
  try {
    const data = await getData(pokemonListURL);

    cardWrapper.innerHTML = "";

    const pokemonList = data.results;
    pokemonData = data.results;
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
        console.log(renderingData.details);
      }
    }
  } catch (error) {
    console.error("Error navigating:", error);
  }
}

searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  if (searchInput.value.length > 0) {
    const filteredPokemon = pokemonData.filter((pokemon) =>
      pokemon.name.includes(searchInput.value.toLowerCase())
    );

    cardWrapper.innerHTML = "";

    filteredPokemon.forEach(async (pokemon) => {
      try {
        const details = await getData(pokemon.url);
        renderPokemonList(pokemon, details);
      } catch (error) {
        console.error("Error fetching details for:", pokemon.name, error);
      }
    });
  } else {
    catchPokemon();
  }
}
catchPokemon();
// catchPokemon("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151");
// catchPokemon("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649");
