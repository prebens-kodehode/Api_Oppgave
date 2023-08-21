import { getData } from "./data/api.js"



/* https://pokeapi.co/api/v2/{endpoint}/

{
  "count": 248,
  "next": "https://pokeapi.co/api/v2/ability/?limit=20&offset=20",
  "previous": null,
  "results": [
    {
      "name": "stench",
      "url": "https://pokeapi.co/api/v2/ability/1/"
    }
  ]
} */

// html elements:
// const mainContainer = document.querySelector("#main-container");
// const navButtonHome = document.querySelector("#nav-index-btn");

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

async function getData(url) {
  const request = await fetch(url);
  const data = await request.json();

  return data;
}
