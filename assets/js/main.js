import { convertePokemonToHtml, solicitaPokemons } from './poke-api.js';

let offset = 0;
const limit = 10;
const maxRecords = 151;
const listaPokemon = document.querySelector('#pokemon-list');
const loadMoreButton = document.getElementById('loadMoreButton');

(async function start() {
  loadPokemons(offset, limit);
})();


async function loadPokemons(offset, limit) {
  const pokemons = await solicitaPokemons(offset, limit);
  listaPokemon.innerHTML += pokemons.map((pokemon) => convertePokemonToHtml(pokemon)).join('');
}

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecord = offset + limit;
  if (qtdRecord >= maxRecords) {
    const newLmit = maxRecords - (qtdRecord - limit);
    loadPokemons(offset, newLmit)
    loadMoreButton.style.display = 'none'
    return
  }
  loadPokemons(offset, limit)
})