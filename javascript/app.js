import { getData } from "./data/api.js";
import { makeElement } from "./utils/makeElement.js";
import { mainContainer } from "./htmlElements.js";
import { renderPokemonDetails } from "./pages/pokemonDetails.js";
import { renderPokemonList } from "./pages/pokemonList.js";
// API constants:
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// navigation "state" (hvilken side?)
let navState = "main";

// Navigation events:
// navButtonHome.addEventListener("click", () => {
//   navState = "main";
//   navigate(baseUrl);
// });

// async function navigate(url) {
//   const data = await getData(url);

//   // data.results.forEach((pokemon) => {
//   //   console.log(pokemon);
//   // });
//   const list = data.results;

//   list.forEach(async (pokemon) => {
//     const details = await getData(pokemon.url);
//     renderPokemonList(pokemon, details);
//     console.log(details);
//     // details.forEach( (detail) => {
//     //   console.log(detail.abilities);
//     // });
//   });
// }

// "https://pokeapi.co/api/v2/pokemon/1/"

async function navigate(url) {
  const data = await getData(url);

  mainContainer.innerHTML = "";

  if (navState === "main") {
    const pokemonList = data.results;
    pokemonList.forEach(async (pokemon) => {
      const details = await getData(pokemon.url);
      renderPokemonList(pokemon, details);
    });
  } else {
    renderPokemonDetails(data);
  }
  // console.log(data)
}

navState = "main";
navigate("https://pokeapi.co/api/v2/pokemon/");
