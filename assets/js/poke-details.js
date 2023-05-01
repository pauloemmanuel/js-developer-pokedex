import { pegaPokemonComDetalhes, takeTypesToHtml } from './poke-api.js';
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

async function setaDadosPokemonNaTela(pokemon){
    setarInformacoesPrincipais(pokemon);
    setarImagem(pokemon.photo);
    await sleep(500)
    setarInformacoesBasicas(pokemon);
    await sleep(500)
    setarAtributos(pokemon.attributes);
}

async function setarInformacoesBasicas(pokemon){
    setaInformacao('#pokemon-base-info-id-content',pokemon.id)
    setaInformacao('#pokemon-base-info-nome-content',pokemon.name)
    setaInformacao('#pokemon-base-info-principal-type-content',pokemon.type)
    setaInformacao('#pokemon-base-info-base-exp-content',pokemon.basic_infos.base_experience)
    setaInformacao('#pokemon-base-info-height-content',pokemon.basic_infos.height)
    setaInformacao('#pokemon-base-info-weight-content',pokemon.basic_infos.weight) 
}

function setaInformacao(referenciaElemento,valor){
    document.querySelector(referenciaElemento).innerHTML = String(valor);
}

function setarAtributos(atributos){
    const valuesHTML = atributos.map(({name,value})=> `<li class="pokemon_details_atribute-item">${name}<br>${value}</li>`)
    const listaDeAtributos = document.querySelector('#pokemon_atibutes-list');
    listaDeAtributos.innerHTML = valuesHTML.join('');
}

function setarImagem(href_imagem){
    const loader = document.querySelector('#image-loader');
    const imagemPokemon = document.querySelector('#poke-image')
    
    imagemPokemon.src = href_imagem;

    loader.style.display = 'none';
    imagemPokemon.style.display = 'block';
}

function setarInformacoesPrincipais(pokemon){
    const nome_pokemon = document.querySelector('#nome-pokemon') 
    nome_pokemon.innerHTML = pokemon.name; 
    const tipos_pokemon = document.querySelector('#tipos-pokemon')
    tipos_pokemon.innerHTML = takeTypesToHtml(pokemon.types)
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


