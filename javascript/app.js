import { getData } from "./data/api.js"

// API constants:
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// navigation "state" (hvilken side?)
let navState = "main";

// Navigation events:
// navButtonHome.addEventListener("click", () => {
//   navState = "main";
//   navigate(baseUrl);
// });

async function navigate(url) {
  const data = await getData(url);

  // data.results.forEach((pokemon) => {
  //   console.log(pokemon);
  // });
  console.log(data);
}

// "https://pokeapi.co/api/v2/pokemon/1/"

navState = "getDetails";
navigate("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281");

function renderPokemonList(pokemon) {
  const pokemonWrapper = document.createElement("div");
  const pokemonTitle = document.createElement("h3");
  pokemonTitle.textContent = pokemon.name;
  const pokemonButton = document.createElement("button");
  pokemonButton.textContent = "Click for details";

  pokemonButton.addEventListener("click", () => {
    navState = "details";
    navigate(pokemon.url);
  });

  // pokemon.url

  pokemonWrapper.append(pokemonTitle, pokemonButton);

  mainContainer.append(pokemonWrapper);
}