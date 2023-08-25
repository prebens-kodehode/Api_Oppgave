import { getData } from "./data/api.js";
import { cardWrapper, searchInput, pageIndex } from "./htmlElements.js";
import { renderPokemonDetails } from "./pages/pokemonDetails.js";
import { renderPokemonList } from "./pages/pokemonList.js";

// API constants:
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonListURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649";
const itemsPerPage = 20;
let pokemonData = [];
let currentPage = 1;
let totalPages = "";
let currentSearchResults = null;
let isLoading = false; // Flag to prevent overlapping fetch/render operations

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
    totalPages = Math.ceil(pokemonData.length / itemsPerPage);
    pageIndex.textContent = `${currentPage}/${totalPages}`;
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

async function handlePage(page) {
  if (isLoading) {
    return; // Return early if a fetch/render operation is in progress
  }

  currentPage = Math.min(Math.max(1, page), totalPages);
  pageIndex.textContent = `${currentPage}/${totalPages}`;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (currentSearchResults) {
    renderSearchResults(currentSearchResults);
  } else {
    await renderPageItems(startIndex, endIndex);
  }
}

async function renderPageItems(startIndex, endIndex) {
  isLoading = true;

  try {
    const data = await getData(pokemonListURL);
    pokemonData = data.results;
    totalPages = Math.ceil(pokemonData.length / itemsPerPage);
    pageIndex.textContent = `${currentPage}/${totalPages}`;
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
  } finally {
    isLoading = false;
  }
}

function renderSearchResults(results) {
  cardWrapper.innerHTML = "";
  Promise.all(results.map(pokemon => fetchPokemonDetails(pokemon.url))).then(detailsArray => {
    detailsArray.forEach((details, index) => {
      if (details) {
        renderPokemonList(results[index], details);
      }
    });
  });
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
    handlePage(currentPage);
  }
}

// Set up event listeners for pagination
const previousPage = document.querySelector("#previous-page");
const nextPage = document.querySelector("#next-page");

previousPage.addEventListener("click", () => handlePage(currentPage - 1));
nextPage.addEventListener("click", () => handlePage(currentPage + 1));

// Set up event listener for search input
searchInput.addEventListener("input", handleSearch);

// Fetch initial data and render first page
fetchAndRenderPokemonList(0, itemsPerPage);

// catchPokemon("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151");
// catchPokemon("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649");
