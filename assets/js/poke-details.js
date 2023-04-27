import { pegaPokemonComDetalhes } from './poke-api.js';
import {Pokemon as PokemonModel} from './Models/pokemon-model.js';
console.log('Script funciona!')

const url_base = 'https://pokeapi.co/api/v2/pokemon/$1';

var query = location.search.slice(1);
var partes = query.split('&');
var data = {};
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
});

const id_pokemon_buscado = data.pokemon_id;

(async ()=>{
    const pokemon = await pegaPokemonComDetalhes(retornaUrlPokemonEspecifico());
    setaDadosPokemonNaTela(pokemon);
    console.log(pokemon)
})()


function retornaUrlPokemonEspecifico(){
    return url_base.replace('$1',id_pokemon_buscado);
}

function setaDadosPokemonNaTela(pokemon){
    
}