import { getData } from "./data/api.js";
import {
  cardWrapper,
  searchInput,
  pageIndex,
  previousPage,
  nextPage,
  pageButtons,
} from "./htmlElements.js";
import { renderPokemonDetails } from "./pages/pokemonDetails.js";
import { renderPokemonList } from "./pages/pokemonList.js";
// import { fetchAbilityDetails } from "./utils/functions.js";

// API constants:
const pokemonsUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649";
const itemsPerPage = 20;
let pokemonDetailsData = []; // array to store details of all pokemon
let currentPage = 1;
let totalPages = "";
let isLoading = false;

async function fetchAllPokemonDetails() {
  try {
    const data = await getData(pokemonsUrl);
    const detailsPromises = data.results.map((pokemon) => getData(pokemon.url));
    pokemonDetailsData = await Promise.all(detailsPromises);
    totalPages = Math.ceil(pokemonDetailsData.length / itemsPerPage);
  } catch (error) {
    console.error("Error fetching all Pokémon details:", error);
  }
}

function renderPokemonCards(startIndex, endIndex) {
  cardWrapper.innerHTML = "";

  for (let i = startIndex; i < endIndex && i < pokemonDetailsData.length; i++) {
    renderPokemonList(pokemonDetailsData[i]);
  }
}

function handlePage(page) {
  if (isLoading) return;

  currentPage = Math.min(Math.max(1, page), totalPages);
  pageIndex.textContent = `${currentPage}/${totalPages}`;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  renderPokemonCards(startIndex, endIndex);
}

function renderSearchResults(results) {
  cardWrapper.innerHTML = "";

  if (results && results.length > 0) {
    results.forEach((details) => {
      renderPokemonList(details);
    });
  } else {
    cardWrapper.innerHTML = "<h2>No pokemon matches your search...</h2>";
  }
}

function updateIndexVisibility(searchTerm) {
  if (searchTerm.length > 0) {
    pageButtons.classList.add("hidden");
  } else {
    pageButtons.classList.remove("hidden");
  }
}

let searchTimeout;

function handleSearch() {
  clearTimeout(searchTimeout);
  const searchTerm = searchInput.value.toLowerCase();

  updateIndexVisibility(searchTerm); // adjust visibility based on search term

  if (searchTerm.length > 0) {
    searchTimeout = setTimeout(() => {
      const searchResults = pokemonDetailsData.filter((details) =>
        details.name.includes(searchTerm)
      );
      renderSearchResults(searchResults);
    }, 250);
  } else {
    handlePage(currentPage);
  }
}

previousPage.addEventListener("click", () => {
  if (currentPage > 1) {
    handlePage(currentPage - 1);
  }
});
nextPage.addEventListener("click", () => {
  if (currentPage < totalPages) {
    handlePage(currentPage + 1);
  }
});

searchInput.addEventListener("input", handleSearch);

// fetch initial data and render first page
async function initializeApp() {
  await fetchAllPokemonDetails();
  handlePage(1);
}

initializeApp();
