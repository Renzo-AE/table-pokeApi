import { table, paintDataInTable } from "./elementsTable.js";

const POKE_API = 'https://pokeapi.co/api/v2/';
const POKEMON_ENDPOINT = `${POKE_API}pokemon`;
let pokemons = null;

/* Pagination setup */
const pagination = {
  pageSize: 10,
  currentPage: 1,
  totalPages: 100,
}

const contentTable = document.getElementById('search-results')
contentTable.append(table(pagination.pageSize))

const getPokemons = async (page) => {
  const apiURL = `${POKEMON_ENDPOINT}?limit=${pagination.pageSize}&offset=${pagination.pageSize * (page - 1)}`
  try{
    const obtenerPokemons = await fetch(apiURL)
    const pokemonsData = await obtenerPokemons.json()
    document.getElementById("search-results-pagination-info").innerText = `${page} de ${pagination.totalPages}`
    pokemons = pokemonsData.results
    pokemons.forEach(async (pokemon, i) => {
      const obtenerPokemon = await fetch(pokemon.url)
      const pokemonData = await obtenerPokemon.json()
      paintDataInTable(pokemonData, i)
    });
  } catch(error) {
    console.log(error)
  }
  
  
}

getPokemons(pagination.currentPage)

// dando funcion a los botones de PREVIOUS and NEXT

const btnPrevious = document.getElementById("btn-prev-pag")
btnPrevious.addEventListener("click", () => {
  if (pagination.currentPage == 1) return

  pagination.currentPage--
  contentTable.innerHTML = ""
  contentTable.append(table(pagination.pageSize))
  getPokemons(pagination.currentPage)
})

const btnNext = document.getElementById("btn-next-pag")
btnNext.addEventListener("click", () => {
  if (pagination.currentPage == pagination.totalPages) return

  pagination.currentPage++
  contentTable.innerHTML = ""
  contentTable.append(table(pagination.pageSize))
  getPokemons(pagination.currentPage)
})

