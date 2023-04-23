import { Pokemon as PokemonModel } from './Models/pokemon-model.js';

let offset = 0;
let limit = 10;

const typesColorIndex = {
  normal: '#A6A877',
  grass: '#77c850',
  fire: '#ee7f30',
  water: '#678fee',
  eletric: '#f7cf2e',
  ice: '#98d5d7',
  ground: '#dfbf69',
  flying: '#a98ff0',
  poison: '#a040a0',
  fighting: '#bf3029',
  psychic: '#f65687',
  dark: '#725847',
  rock: '#b8a137',
  bug: '#a8b720',
  ghost: '#6e5896',
  steel: '#b9b7cf',
  dragon: '#6f38f6',
  fairy: '#f9aec7' 
}

function takeTypesToHtml(tipos){

  return tipos.map(tipo => `<li class="pokemon-list__types--item pokemon-type-${tipo}">${tipo}</li>`).join('')

}

export function convertePokemonToHtml(pokemon) {
  const types = takeTypesToHtml(pokemon.types)
  return `
          <li class="pokemon-list__item pokemon-type-${pokemon.type}">
            <span class="pokemon-number">#${pokemon.id}</span>
            <span class="pokemon-title">${pokemon.name}</span>

            <div class="pokemon-list__item--details">
              <ol class="pokemon-list__types">
                ${types}
              </ol>
              <div class="img-container">
              <img src="${pokemon.photo}" alt="${pokemon.name}">
              </div>
            </div>
          </li>
          `
}

export function resetaListaPokemon(){
  listaPokemon.innerHTML = "";
}

export async function solicitaPokemons(offset = 0, limit = 20) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map((pokemon)=> pegaPokemonComDetalhes(pokemon.url))) 
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonsWithDetails => pokemonsWithDetails);
  return response;
}



/**
 * @param url - The URL of the API endpoint that returns details of a specific
 * Pokemon.
 */
export async function pegaPokemonComDetalhes(url){
   return fetch(url)
          .then(res => res.json())
          .then(pokemon => convertPokeApiToPokemonModel(pokemon));
}

function convertPokeApiToPokemonModel(pokeApiDetails){
  const pokemon = new PokemonModel();
  pokemon.name = pokeApiDetails.name;
  pokemon.id = pokeApiDetails.id;
  pokemon.photo = pokeApiDetails.sprites.other.dream_world.front_default;
  console.log(pokeApiDetails)
  pokemon.types = pokeApiDetails.types.map(type => type.type.name);
  pokemon.type = pokemon.types.at(0);
  return pokemon
}