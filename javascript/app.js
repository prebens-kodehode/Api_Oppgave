import { getData } from "./data/api.js";
import { cardWrapper, searchInput } from "./htmlElements.js";
import { renderPokemonDetails } from "./pages/pokemonDetails.js";
import { renderPokemonList } from "./pages/pokemonList.js";

// API constants:
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonListURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
let pokemonData = [];

async function fetchPokemonDetails(url) {
  try {
    const details = await getData(url);
    return details;
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
}

async function fetchAndRenderPokemonList() {
  try {
    const data = await getData(pokemonListURL);
    pokemonData = data.results;

    cardWrapper.innerHTML = "";

    for (const pokemon of pokemonData) {
      const details = await fetchPokemonDetails(pokemon.url);
      if (details) {
        renderPokemonList(pokemon, details);
        console.log(details);
      }
    }
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
}

let searchTimeout;

async function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  clearTimeout(searchTimeout);

  if (searchTerm.length > 0) {
    searchTimeout = setTimeout(async () => {
      const filteredPokemon = pokemonData.filter((pokemon) =>
        pokemon.name.includes(searchTerm)
      );

      cardWrapper.innerHTML = "";

      if (filteredPokemon.length > 0) {
        for (const pokemon of filteredPokemon) {
          const details = await fetchPokemonDetails(pokemon.url);
          if (details) {
            renderPokemonList(pokemon, details);
          }
        }
      } else {
        cardWrapper.innerHTML = "<h2>No matches found...</h2>";
      }
    }, 300);
  } else {
    fetchAndRenderPokemonList();
  }
}

searchInput.addEventListener("input", handleSearch);

fetchAndRenderPokemonList();

// catchPokemon("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151");
// catchPokemon("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649");
