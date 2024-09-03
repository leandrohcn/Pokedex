




const pokemonList = document.getElementById('pokemonList')
const verMais = document.getElementById('morePoke')
const limit = 6
let offset = 0



function pokemonTypesList(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => {
        return `<li class="type">${typeSlot.type.name}</li>`
    })
} 


function loadMorePoke(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons) => {
            pokemonList.innerHTML +=  pokemons.map((pokemon) => 
                `
                <li class="pokemon ${pokemon.type}">
                                
                     <span class ="number">${pokemon.myOrder}</span>
                     <span class="name"> ${pokemon.name}</span>
                
                     <div class="details">
                        <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                
                        <img src="${pokemon.sprite}" 
                            alt="${pokemon.name}">
                    </div>
                </li>
                `
                ).join('')
    })
}       

loadMorePoke(offset, limit)

verMais.addEventListener('click', () => {
    offset += limit
    loadMorePoke(offset, limit)
})