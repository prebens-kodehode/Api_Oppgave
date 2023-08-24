import { getData } from "./data/api.js";
import { cardWrapper, searchInput } from "./htmlElements.js";
import { renderPokemonDetails } from "./pages/pokemonDetails.js";
import { renderPokemonList } from "./pages/pokemonList.js";

// API constants:
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonListURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649";
const itemsPerPage = 20; // Number of items to render per page
let pokemonData = [];
let currentPage = 1;
let currentSearchResults = null; // Store the search results

async function fetchPokemonDetails(url) {
  try {
    const details = await getData(url);
    return details;
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
}

async function fetchAndRenderPokemonList(startIndex, endIndex) {
  try {
    const data = await getData(pokemonListURL);
    pokemonData = data.results;

    cardWrapper.innerHTML = "";

    for (let i = startIndex; i < endIndex && i < pokemonData.length; i++) {
      const pokemon = pokemonData[i];
      const details = await fetchPokemonDetails(pokemon.url);
      if (details) {
        renderPokemonList(pokemon, details);
      }
    }
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
}

async function handlePagination(page) {
  // Ensure currentPage doesn't go below 1
  currentPage = Math.max(1, page);

  // Calculate the total number of pages
  const totalPages = Math.ceil(pokemonData.length / itemsPerPage);

  // Ensure currentPage doesn't exceed the total number of pages
  currentPage = Math.min(currentPage, totalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (currentSearchResults) {
    renderSearchResults(currentSearchResults);
  } else {
    await fetchAndRenderPokemonList(startIndex, endIndex);
  }
}

function renderSearchResults(results) {
  cardWrapper.innerHTML = "";

  Promise.all(
    results.map(async (pokemon) => {
      const details = await fetchPokemonDetails(pokemon.url);
      if (details) {
        renderPokemonList(pokemon, details);
      }
    })
  );
}

async function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm.length > 0) {
    currentSearchResults = pokemonData.filter((pokemon) =>
      pokemon.name.includes(searchTerm)
    );

    renderSearchResults(currentSearchResults);
  } else {
    currentSearchResults = null;
    handlePagination(currentPage);
  }
}

// Set up event listeners for pagination
const previousPage = document.querySelector("#previous-page");
const nextPage = document.querySelector("#next-page");

previousPage.addEventListener("click", () => handlePagination(currentPage - 1));
nextPage.addEventListener("click", () => handlePagination(currentPage + 1));

// Set up event listener for search input
searchInput.addEventListener("input", handleSearch);

// Fetch initial data and render first page
fetchAndRenderPokemonList(0, itemsPerPage);
handlePagination(currentPage);

// catchPokemon("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151");
// catchPokemon("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649");
